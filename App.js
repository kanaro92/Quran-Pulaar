import React, {Component} from 'react';
import {Alert, Dimensions, FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View} from 'react-native';
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
//import DeviceInfo from 'react-native-device-info';

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

        /*DeviceInfo.getFirstInstallTime().then((firstInstallTime) => {
            console.log("i: "+firstInstallTime)
            // Android: 1517681764528
        });*/
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
                        <View style={styles.title_view}>
                            <Text style={styles.title_text}> Quran Pulaar - Abuu SIH</Text>
                        </View>
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
                            initialNumToRender={4}
                            keyExtractor={item => item.surat_number.toString()}
                            horizontal
                            pagingEnabled
                            refreshing={this.isRefresh}
                            inverted={-1}
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
            //alert(value)
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
            'Tongoode coggu jaa??ngal',
            'So tawi ko a coo????o, naatnu tongoode nde',
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
                Alert.alert("Ca??eele", "Ngam ke??a tongoode, jokkondir e:\n"
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
                Alert.alert("Ca??eele internet", "A??a jogi ca??eele internet, se??o!");
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
    title_view: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'stretch',
        alignContent: 'stretch',
        paddingTop: height/3,
    },
    title_text: {
        fontFamily: 'sans-serif-condensed',
        fontWeight: 'bold',
        fontSize: 25,
    },
    spinner_view: {
        flexDirection: "row",
        justifyContent: "center",
    },
    backGroundImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    }
});

export default QuranPulaarApp;
