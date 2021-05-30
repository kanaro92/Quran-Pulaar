import React, {PureComponent} from 'react';
import {
    Alert,
    Dimensions,
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBookmark, faPauseCircle, faPlay} from '@fortawesome/free-solid-svg-icons';
import SoundPlayer from 'react-native-sound-player';
import {Badge} from 'react-native-elements';
import RNFetchBlob from "rn-fetch-blob";
import * as Progress from 'react-native-progress';
import AsyncStorage from "@react-native-community/async-storage";

const {width, height} = Dimensions.get('screen');

class ContentComponent extends PureComponent {
    constructor() {
        super();
        this.state = {
            isPlaying: false,
            isPaused: false,
            isDownloading: false,
            spinner: false,
            isRefresh: false,
            receivedByte: 0,
            progressNumber: 0,
        }
    }

    render() {
        return (
            <View>
                <View style={styles.juzz}>
                    <Text style={styles.juzz_text}>{this.props.item.juzz}</Text>
                    <Text style={styles.juzz_text}>{this.props.item.surat}</Text>
                </View>
                <View style={styles.body}>
                    <ImageBackground source={require('../images/background.png')} style={styles.backGroundImage}>
                        <View style={styles.play_icon}>
                            {this.state.spinner ?
                                <View style={styles.progress_view}>
                                    <Text>Ina aawto simoore nde...</Text>
                                    <View style={styles.spinner_view}>
                                        <Text><Progress.Bar color={'green'} progress={this.state.progressNumber}
                                                            width={150}/></Text>
                                        <Text> {this.state.receivedByte}/{(this.props.item.size / 1024).toFixed(2)}Mb</Text>
                                    </View>
                                </View> :
                                <View>
                                    {this.state.isRefresh ?
                                        <Text>
                                            <Progress.CircleSnail color={'green'}/>
                                        </Text> :
                                        <View>
                                            {this.state.isPlaying ?
                                                <FontAwesomeIcon icon={faPauseCircle} size={25} color={"#24561F"}
                                                                 onPress={() => this.pauseSong()}/> :
                                                <FontAwesomeIcon icon={faPlay} size={25} color={"#24561F"}
                                                                 onPress={() => this.playSourate(this.props.item.ayat_url, this.props.item.size)}/>
                                            }
                                        </View>

                                    }
                                </View>
                            }
                        </View>
                        <View style={styles.title_view}>
                            <ImageBackground style={styles.bg_surat} source={require('../images/bg_sourate.jpeg')}>
                                <View style={styles.surat_title_view}>
                                    <Text style={styles.pr_title_text}>{this.props.item.pr_title} </Text>
                                    {this.props.item.ayat_img !== "" ?
                                        <Image source={this.props.item.ayat_img} style={styles.ayat_image}/> :
                                        <Text/>
                                    }
                                    <Text style={styles.ar_title_text}> {this.props.item.ar_title} </Text>
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
                                                    this.props.item.size
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
                            <Text/>
                            <Text style={styles.footer_text}>{this.props.item.page_number}</Text>
                            <TouchableOpacity onPress={() => this.bookmark(this.props.item)}>
                                <FontAwesomeIcon icon={faBookmark} size={20} color={"#24561F"}/>
                                <Badge
                                    value="+"
                                    status="success"
                                    badgeStyle={styles.badge}
                                    textStyle={styles.badgeText}
                                    containerStyle={{position: 'absolute', top: 0, left: -3}}
                                />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
            </View>

        );
    }

    _onFinishedPlayingSubscription = null

    playSourate = (url: string, size: number) => {
        this.setState({
            isPlaying: false
        });
        if(this.state.isPaused){
            SoundPlayer.resume();
            this.setState({
                isPlaying: true
            });
            this.setState({
                isPaused: false
            });
            return;
        }
        let fileName = url.substring(30, url.length - 4);
        let filePath = RNFetchBlob.fs.dirs.DocumentDir + '/' + fileName;
        RNFetchBlob.fs.exists(filePath + '.mp3').then(res => {
            if (res) {
                //comparing files size
                RNFetchBlob.fs.stat(filePath + '.mp3')
                    .then((stats) => {
                        let existingSize = stats.size / 1024;
                        if (existingSize.toFixed(0) == size || existingSize.toFixed(0) >= size - 4) {
                            this._onFinishedPlayingSubscription = SoundPlayer.addEventListener('FinishedPlaying', () => {
                                this._onFinishedPlayingSubscription.remove();
                                this.setState({
                                    isPlaying: false
                                });
                            });
                            SoundPlayer.playSoundFile(fileName, 'mp3');
                            this.setState({
                                isPlaying: true
                            });
                            this.setState({
                                spinner: false
                            });
                        } else {
                            this.downloadSourate(url, null, null, size);
                        }
                    })
                    .catch((err) => {
                        Alert.alert("Kabaaru", "Waɗi caɗeele !");
                    })
            } else {
                this.downloadSourate(url, null, null, size);
            }
        }).catch(reason => {
            Alert.alert("Kabaaru", "Roŋki aawtaade simoore nde, seŋo e internet !");
        })
    }

    playAyat(url: string, startTime: number, endTime: number, size: number) {
        let fileName = url.substring(30, url.length - 4);
        if (fileName != "1_Fatiha") {
            return;
        }
        let filePath = RNFetchBlob.fs.dirs.DocumentDir + '/' + fileName;
        RNFetchBlob.fs.exists(filePath + '.mp3').then(res => {
            if (res) {
                //comparing files size
                RNFetchBlob.fs.stat(filePath + '.mp3')
                    .then((stats) => {
                        let existingSize = stats.size / 1024;
                        if (existingSize.toFixed(0) == size || existingSize.toFixed(0) >= size - 4) {
                            this._onFinishedPlayingSubscription = SoundPlayer.addEventListener('FinishedPlaying', () => {
                                this._onFinishedPlayingSubscription.remove();
                                this.setState({
                                    isPlaying: false
                                });
                            });
                            SoundPlayer.playSoundFile(fileName, 'mp3');
                            let duration = endTime - startTime;
                            SoundPlayer.seek(startTime);
                            this.sleep(duration * 1000).then(() => {
                                this.stopSong();
                            });
                            this.setState({
                                isPlaying: true
                            });
                            this.setState({
                                spinner: false
                            });
                        } else {
                            this.downloadSourate(url, startTime, endTime, size);
                        }
                    })
                    .catch((err) => {
                        Alert.alert("Kabaaru", "Waɗi caɗeele !");
                    })
            } else {
                this.downloadSourate(url, startTime, endTime, size)
            }
        }).catch(reason => {
            Alert.alert("Kabaaru", "Roŋki aawtaade simoore nde, seŋo e internet !");
        })
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    pauseSong = () => {
        SoundPlayer.pause();
        this.setState({
            isPlaying: false
        });
        this.setState({
            isPaused: true
        });
        this._onFinishedPlayingSubscription.remove();
    }

    stopSong = () => {
        SoundPlayer.stop();
        this.setState({
            isPlaying: false
        });
        this._onFinishedPlayingSubscription.remove();
    }

    downloadSourate(url: string, startTime: number, endTime: number, size: number) {
        this.setState({
            isDownloading: true
        });
        this.setState({
            spinner: true
        });
        let fileName = url.substring(30, url.length - 4);
        const {fs: {dirs}} = RNFetchBlob
        const PATH_TO_LIST = dirs.DocumentDir
        const dest = `${PATH_TO_LIST}/${fileName}.mp3`
        this.downtask = RNFetchBlob.config({
            IOSBackgroundTask: true, // required for both upload
            IOSDownloadTask: true, // Use instead of IOSDownloadTask if uploading
            path: dest,
            fileCache: true
        })
            .fetch('GET', url, {})
            .progress((receivedStr, totalStr) => {
                // Do any things
                this.setState({
                    receivedByte: (receivedStr / (1024 * 1024)).toFixed(2)
                });
                this.setState({
                    progressNumber: this.state.receivedByte / (size / 1024).toFixed(2)
                });
            }).then(value => {
                this.setState({
                    isDownloading: false
                });
                this.setState({
                    spinner: false
                });
                this.setState({
                    isRefresh: true
                });
                this.sleep(1000).then(() => {
                    this.setState({
                        isRefresh: false
                    });
                    if (startTime && endTime) {
                        this.playAyat(url, startTime, endTime, size);
                    } else {
                        this.playSourate(url, size);
                    }
                });
            })
        this.downtask.catch(async err => {
            // Check error
            this.setState({
                spinner: false
            });
            this.setState({
                isDownloading: false
            });
            Alert.alert("Kabaaru", "Roŋki aawtaade simoore nde, seŋo e internet !");
        })
    }

    bookmark = async (sourate) => {
        try {
            let bookmarks = [];
            let itemToSave = {
                page_number: sourate.page_number,
                ar_title: sourate.ar_title,
                pr_title: sourate.pr_title,
            }
            const values = await AsyncStorage.getItem('bookmarks');
            if(values !== null) {
                bookmarks = JSON.parse(values);
                console.log(bookmarks);
            }
            if(bookmarks.length !== 0){
                const item = bookmarks.find(value => value.page_number === sourate.page_number);
                if(item){
                    const index = bookmarks.indexOf(item);
                    bookmarks.splice(index, 1);

                }else {
                    bookmarks.push(itemToSave);
                }
            }else {
                bookmarks.push(itemToSave);
            }
            await AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        }catch (error) {
            alert(error)
        }
    }

    componentWillUnmount() {
        SoundPlayer.unmount();
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
    ar_title_text: {
        marginTop: 5,
        fontWeight: 'bold',
        fontSize: 19,
    },
    pr_title_text: {
        marginTop: 5,
        fontWeight: 'bold',
        fontSize: 16,
    },
    juzz: {
        paddingLeft: 5,
        paddingRight: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    juzz_text: {
        fontSize: 12,
    },
    progress_view: {
        alignItems: 'center',
    },
    spinner_view: {
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'stretch'
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
        marginLeft: 10,
        borderTopWidth: 3,
        paddingTop: 2,
        paddingLeft: 5,
        paddingRight: 5,
        borderColor: '#4dbf81',
        width: '95%',
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

