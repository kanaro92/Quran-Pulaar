import React, {PureComponent, useRef} from 'react';
import {
    Image, Animated, Text, View, Dimensions,
    StyleSheet, ImageBackground, ScrollView, TouchableOpacity
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBookmark, faPlay, faPauseCircle} from '@fortawesome/free-solid-svg-icons';
import SoundPlayer from 'react-native-sound-player';
import Spinner from 'react-native-loading-spinner-overlay';
import {Badge} from 'react-native-elements';

const {width, height} = Dimensions.get('screen');
const imageW = width * 1;
const imageH = imageW;

class ContentComponent extends PureComponent{
    constructor(){
        super();
        this.state = {
            isPlaying: false,
            isLoading: false,
            spinner: false,
        }
      }

    render(){
      return(
        <View>
            <View style={styles.juzz}>
                <Text style={styles.juzz_text}>{this.props.item.juzz}</Text>
                <Text style={styles.juzz_text}>{this.props.item.surat}</Text>
            </View>
            <View style={styles.body}>
                <ImageBackground source={require('../images/background.png')} style={styles.backGroundImage}>
                    <View style={styles.play_icon}>
                        {this.state.isPlaying ?
                            <FontAwesomeIcon icon={faPauseCircle} size={20} color={"#24561F"} onPress={() => this.stopSong()}/> :
                            <FontAwesomeIcon icon={faPlay} size={20} color={"#24561F"} onPress={() => this.playSong(this.props.item.ayat_url)}/>
                        }
                    </View>
                    <View style={styles.title_view}>
                        <ImageBackground style={styles.bg_surat} source={require('../images/bg_sourate.jpeg')}>
                            <View style={styles.surat_title_view}>
                                <Text style={styles.surat_title_text}>{this.props.item.surat_title}</Text>
                                {this.props.item.ayat_img != "" ?
                                    <Image source={this.props.item.ayat_img} style={styles.ayat_image}/>:
                                    <Text></Text>
                                }
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={styles.content}>
                        <ScrollView>
                            {this.props.item.ayat.map(ayat => {
                                return <View style={styles.ayat_content}>
                                    <TouchableOpacity
                                        style={styles.touchable_ayat}
                                        onPress={() =>
                                            this.playAyat(
                                                this.props.item.ayat_url,
                                                ayat.startTime,
                                                ayat.endTime,
                                            )}
                                    >
                                        <Text selectable={true} style={styles.ayat_text}>{ayat.ar_ayat}</Text>
                                        <Text selectable={true} style={styles.ayat_text}>{ayat.pr_ayat}</Text>
                                        <Image source={ayat.img} style={styles.ayat_image}/>
                                    </TouchableOpacity>
                                </View>;
                            })}
                        </ScrollView>
                    </View>
                    <View style={styles.footer}>
                        <Text></Text>
                        <Text style={styles.footer_text}>{this.props.item.page_number}</Text>
                        <View>
                            <FontAwesomeIcon icon={faBookmark} size={20} color={"#24561F"}/>
                            <Badge
                                value="+"
                                status="success"
                                badgeStyle={styles.badge}
                                textStyle={styles.badgeText}
                                containerStyle={{ position: 'absolute', top: 0, left: -3 }}
                            />
                        </View>
                    </View>
                </ImageBackground>
            </View>
            <Spinner
                visible={this.state.spinner}
                textContent={'Ina aawto simoore nde...'}
                textStyle={styles.spinnerTextStyle}
            />
        </View>

      );
    }

    _onFinishedPlayingSubscription = null
    _onFinishedLoadingURLSubscription = null

    playSong = (url: string) => {
        if(this.state.isLoading){
            this.setState({
                spinner: true
            });
            return;
        }
        this.setState({
            isLoading: true
        });
        this.setState({
            spinner: true
        });

        this._onFinishedLoadingURLSubscription = SoundPlayer.addEventListener('FinishedLoadingURL', () => {
            this.setState({
                spinner: false
            });
            this.setState({
                isLoading: false
            });
            try {
                SoundPlayer.play()
                this.setState({
                    isPlaying: true
                });
            } catch (e) {
                alert(`Roŋki aawtaade simoore nde, seŋo e internet !`, e)
            }
            this._onFinishedLoadingURLSubscription.remove();
        } );
        this._onFinishedPlayingSubscription = SoundPlayer.addEventListener('FinishedPlaying', () => {
            this._onFinishedPlayingSubscription.remove();
            //SoundPlayer.unmount();
            this.setState({
                isPlaying: false
            });
        } )
        try{
            SoundPlayer.loadUrl(url);
        } catch (e) {
            alert(`Roŋki aawtaade simoore nde, seŋo e internet !`, e)
        }
    }

    stopSong = () => {
        SoundPlayer.stop();
        this.setState({
            isPlaying: false
        });
        this._onFinishedPlayingSubscription.remove();
        this._onFinishedLoadingURLSubscription.remove();
    }


    playAyat(url: string, startTime: number, endTime: number) {
        return;
        this.setState({
            spinner: true
        });
        this._onFinishedLoadingURLSubscription = SoundPlayer.addEventListener('FinishedLoadingURL', () => {
            this._onFinishedLoadingURLSubscription.remove();
            this.setState({
                spinner: false
            });
            this.setState({
                isLoading: false
            });
            try {
                let duration = endTime - startTime;
                //alert("s: "+startTime+" e: "+endTime+" d: "+duration * 1000);
                SoundPlayer.seek(startTime);
                SoundPlayer.play();this.setState({
                    isPlaying: true
                });
                this.sleep(duration * 1000).then(() => {
                    this.stopSong();
                });
                /*this.seekSound(startTime).then(() => {
                    alert("seek finished : ");

                });*/
            } catch (e) {
                alert(`Roŋki aawtaade simoore nde, seŋo e internet !`, e)
            }
        } )
        this._onFinishedPlayingSubscription = this._onFinishedPlayingSubscription = SoundPlayer.addEventListener('FinishedPlaying', () => {
            this._onFinishedPlayingSubscription.remove();
            //SoundPlayer.unmount();
            this.setState({
                isPlaying: false
            });
        } )
        try{
            SoundPlayer.loadUrl(url);
        } catch (e) {
            alert(`Roŋki aawtaade simoore nde, seŋo e internet !`, e)
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    seekSound(startTime) {
        return new Promise(resolve => {
            resolve(SoundPlayer.seek(startTime));
        });
    }

    componentWillUnmount() {
        //SoundPlayer.unmount();
    }
}

export default ContentComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: '100%',
        height: '100%',
    },
    bg_surat: {
        marginTop: 5,
        marginLeft: 12,
        width: '96%',
        height: 50,
    },
    content: {
        paddingLeft: 12,
        paddingRight: 10,
        height: '76%',
    },
    ayat_content: {
        alignItems: 'center'
    },
    body: {
        width: width,
        height: '95%',
        borderWidth: 3,
        borderColor: '#4dbf81',
        borderRadius: 10
    },
    play_icon: {
        paddingTop: 18,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    title_view: {
        paddingBottom: 5,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    surat_title_view: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'stretch',
        alignContent: 'stretch',
        paddingTop: 8
    },
    surat_title_text: {
        marginTop: 5,
        paddingRight: 5,
        fontWeight: 'bold',
        fontSize: 16,
    },
    juzz: {
        paddingLeft:5,
        paddingRight:5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    juzz_text: {
        fontSize: 12,
    },
    backGroundImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    ayat_image: {
        width: 30,
        height: 30,
    },
    touchable_ayat: {
        alignItems: "center",
    },
    ayat_text: {
        fontSize: 18,
        textAlign: 'center',
        padding: 3
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft:10,
        borderTopWidth: 3,
        paddingTop: 2,
        paddingLeft: 5,
        paddingRight: 5,
        borderColor: '#4dbf81',
        width:'95%',
        borderRadius: 10
    },
    footer_text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    badge: {
        height: 12,
        minWidth: 0,
        width: 12
    },
    badgeText: {
        fontSize: 9,
        paddingHorizontal: 0
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
});
