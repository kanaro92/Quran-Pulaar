import React, { Component } from 'react';
import { 
  Image, Animated, Text, View, Dimensions,
  StyleSheet, ImageBackground, ScrollView, SafeAreaView, TouchableOpacity
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBookmark, faPlay, faPauseCircle} from '@fortawesome/free-solid-svg-icons';
import RNRestart from 'react-native-restart';
import sourates from './sourates';
import AppHeader from './screens/AppHeader';
import SoundPlayer from 'react-native-sound-player';
import Spinner from 'react-native-loading-spinner-overlay';


const { width, height } = Dimensions.get('screen');
const imageW = width * 1;
const imageH = imageW ;


class QuranPulaarApp extends Component{
    constructor(){
        super();
        this.state = {
            isPlaying: false,
            spinner: false,
        }
      }

     //const scrollX = React.useRef(new Animated.Value(0)).current
  //RNRestart.Restart();
  render(){
    return( 
    <SafeAreaView style={styles.container}>
    <View 
        style={[
          StyleSheet.absoluteFillObject
        ]}
    >
      {sourates.map(() => {
        return <Image 
          source={require('./images/background.png')}
          style={styles.image}
          blurRadius={50}
        />
      })}
    </View>
    <AppHeader />
    <Animated.FlatList
        data={sourates}
        keyExtractor={(_, index) => index}
        horizontal
        pagingEnabled
        renderItem={({item}) => {
          return <View >    
            <View style={styles.juzz}>
              <Text>{item.juzz}</Text>
              <Text>{item.surat}</Text>
            </View>
            <View style={styles.body}>
            <ImageBackground source={require('./images/background.png')} style={styles.backGroundImage}>
              <View style={styles.play_icon}>
                {this.state.isPlaying ? 
                  <FontAwesomeIcon icon={faPauseCircle} size={28} color={"#24561F"} onPress={() => this.stopSong()}/> :
                  <FontAwesomeIcon icon={faPlay} size={25} color={"#24561F"} onPress={() => this.playSong(item.ayat_url)}/>
                }
              </View>
              <View style={styles.title_view}>
              <ImageBackground style={styles.bg_surat} source={require('./images/bg_sourate.jpeg')}>
                <View style={styles.surat_title_view}>
                  <Text style={styles.surat_title_text}>{item.surat_title}</Text>
                  {item.ayat_img != "" ? 
                    <Image source={item.ayat_img} style={styles.ayat_image}/>:
                    <Text></Text>
                  }
                </View>
              </ImageBackground>
            </View>
            <View style={styles.content}> 
                <ScrollView>
                  {item.ayat.map(ayat => {
                    return <View style={styles.ayat_content}>
                        <TouchableOpacity
                          style={styles.touchable_ayat}
                          //onPress={onPress}
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
              <Text style={styles.footer_text}>{item.page_number}</Text>
              <FontAwesomeIcon icon={faBookmark} size={20} color={"#24561F"}/>
            </View>
            </ImageBackground>
            </View>
          </View>
        }}
      />

    <Spinner
      visible={this.state.spinner}
      textContent={'Loading...'}
      textStyle={styles.spinnerTextStyle}
    />
  </SafeAreaView>
  );}

  playSong = (url) => {
    try {
      this.setState({
        spinner: true
      });
      // play the file tone.mp3
      //SoundPlayer.playSoundFile('tone', 'mp3')
      // or play from url
      //alert(this.state.isPlaying)
      SoundPlayer.playUrl(url);
      this.setState({
        isPlaying: true
      });
    } catch (e) {
        alert(`cannot play the sound file`, e)
    }
  }

  stopSong = () => {
    SoundPlayer.stop();
    this.setState({
        isPlaying: false
    });
  }

  _onFinishedPlayingSubscription = null;
  _onFinishedLoadingURLSubscription = null;
  componentWillUnmount() {
      this._onFinishedPlayingSubscription.remove()
      _onFinishedLoadingSubscription.remove()
      _onFinishedLoadingFileSubscription.remove()
      this._onFinishedLoadingURLSubscription.remove()
    }

  componentDidMount() {
      this._onFinishedPlayingSubscription = SoundPlayer.addEventListener('FinishedPlaying', ({ success }) => {
          this.setState({
              isPlaying: false
          });
          alert('finished playing', success)
      })
      _onFinishedLoadingSubscription = SoundPlayer.addEventListener('FinishedLoading', ({ success }) => {
        console.log('finished loading', success)
      })
      _onFinishedLoadingFileSubscription = SoundPlayer.addEventListener('FinishedLoadingFile', ({ success, name, type }) => {
        console.log('finished loading file', success, name, type)
      })
      this._onFinishedLoadingURLSubscription = SoundPlayer.addEventListener('FinishedLoadingURL', ({ success, url }) => {
        this.setState({
          spinner: false
      });
      })
  }

}

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
    height: '78%',
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
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title_view: {
    paddingTop: 3,
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
  justifyContent: 'space-between',
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
 spinnerTextStyle: {
  color: '#FFF'
 },
});
export default QuranPulaarApp;
