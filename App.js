import React, {Component} from 'react';
import {Alert, Dimensions, FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, View} from 'react-native';
import allSourates from './sourates';
import freeSourates from './free-sourates';
import AppHeader from './screens/AppHeader';
import Content from './screens/ContentComponent';
import {appService} from './service/app-service';
import prompt from "react-native-prompt-android";
import AsyncStorage from "@react-native-community/async-storage";
import venteApi from "./api/vente";
import {Bars} from 'react-native-loader';
import {TIMEOUT_ERROR} from "apisauce";

const {width, height} = Dimensions.get('screen');

class QuranPulaarApp extends Component {
    isRefresh: boolean = false;

    constructor() {
        super();
        this.state = {
            sourates: freeSourates,
            spinner: true
        }
        //Check code
        //this.storeData('quranCode', null);
        this.chekCode();
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={[StyleSheet.absoluteFillObject]}>
                    <Image
                        source={require('./images/background.png')}
                        style={styles.image}
                        blurRadius={50}
                    />
                </View>
                {this.state.spinner ?
                    <ImageBackground source={require('./images/background.png')} style={styles.backGroundImage}>
                        <View style={styles.spinner_view}>
                            <Bars size={40} color="#60b17d" />
                        </View>
                    </ImageBackground>
                     :
                    <View>
                        <AppHeader/>
                        <FlatList
                            data={this.state.sourates}
                            ref={(ref) => {
                                this.flatListRef = ref;
                            }}
                            initialNumToRender={40}
                            keyExtractor={item => item.surat_number.toString()}
                            horizontal
                            pagingEnabled
                            refreshing={this.isRefresh}
                            renderItem={({item}) => {
                                return <View>
                                    <Content item={item}/>
                                </View>
                            }}
                        />
                    </View>
                }
            </SafeAreaView>
        );
    }

    scrollToIndex = (index: number) => {
        this.flatListRef.scrollToIndex({animated: true, index: index});
    }

    componentDidMount() {
        // subscribe to home component messages
        this.subscription = appService.getIndexSubject().subscribe(index => {
            if (index) {
                this.scrollToIndex(index);
            }
        });
    }

    componentWillUnmount() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();

    }

    storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.log('Error while saving data: '+e);
        }
    }

    getData = async (key) => {
        try {
            return await AsyncStorage.getItem(key);
        } catch(e) {
            console.log('Error while getting data: '+e);
        }
    }

    chekCode() {
        this.getData('quranCode').then(value => {
            alert(value)
            console.log("quranCode: " + value);
            try {
                if (value > 0) {
                    this.setState({
                        sourates: allSourates
                    });
                    this.setState({
                        spinner: false
                    });
                } else {
                    this.askForCode();
                }
            } catch (e) {
                this.askForCode();
            }
        });
    }

    askForCode() {
        prompt(
            'Tongoode coggu jaaɓngal',
            'So tawi ko a cooɗɗo, naatnu tongoode nde',
            [
                {text: 'OK', onPress: value => this.chekCodeValidity(value)},
            ],
            {
                cancelable: false,
                placeholder: 'code',
                type: "numeric"
            }
        )
    }

    async chekCodeValidity(code) {
        const response = await venteApi.getVenteByCode(Number(code));
        if(response.ok){
            if (response.data && Number(code) === response.data.code) {
                console.log('data.code: ' + response.data.code);
                console.log('data: ' + response.data);
                console.log('duration: ' + response.duration);
                console.log('status: ' + response.status);
                this.setState({
                    sourates: allSourates
                });
                this.storeData('quranCode', response.data.code);
                this.setState({
                    spinner: false
                });
                console.log("Code valid: ");
            } else {
                Alert.alert("Caɗeele", "Ngam keɓa tongoode, jokkondir e:\n"
                    + "Abuu Sih: +221 77 3091782 - Senegaal\n"
                    + "Hamath Kan: +222 48682865 - Muritani\n"
                    + "Amadu Bah: +1 7753138425 Amerik");
                console.log("Code not valid: ");
                this.setFreeSourates();
                this.setState({
                    spinner: false
                });
            }
        } else {
            if(response.status === 400) {
                this.setFreeSourates();
            }
            if(response.problem === TIMEOUT_ERROR) {
                Alert.alert("Caɗeele internet", "Aɗa jogi caɗeele internet, seŋo!");
                this.setFreeSourates();
            }
            this.setState({
                spinner: false
            });
            console.log('Network error');
            console.log('problem: ' + response.problem);
            console.log('originalErr: ' + response.originalError);
            console.log('duration: ' + response.duration);
            console.log('status: ' + response.status);
        }
    }

    setFreeSourates() {
        this.setState({
            sourates: freeSourates
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    spinner_view: {
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: height/3
    },
    backGroundImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    }
});

export default QuranPulaarApp;
