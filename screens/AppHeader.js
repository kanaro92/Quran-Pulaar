import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBook , faBookmark, faTools, faInfoCircle, faPlay, faPauseCircle} from '@fortawesome/free-solid-svg-icons';
import SoundPlayer from 'react-native-sound-player';
import Spinner from 'react-native-loading-spinner-overlay';


class AppHeader extends Component{
    constructor(){
        super();
        this.state = {
            isPlaying: false,
            spinner: false
        }
        this.setButton = this.setButton.bind(this);
      }
      setButton(id){
        this.setState({buttonId: id});
      }

    playSong = () => {
        try {
          this.setState({
            spinner: true
          });
          // play the file tone.mp3
          //SoundPlayer.playSoundFile('tone', 'mp3')
          // or play from url
          //alert(this.state.isPlaying)
          SoundPlayer.playUrl('http://abousy.com/audios/coran/An%20nas.mp3');
          this.setState({
            isPlaying: true
          });
        } catch (e) {
            alert(`cannot play the sound file`, e)
        }
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

    stopSong = () => {
        SoundPlayer.stop();
        this.setState({
            isPlaying: false
        });
    }

    render(){
      return(
        <View style={styles.header}>
          <FontAwesomeIcon icon={faInfoCircle} size={28} color={"#24561F"} onPress={() => alert('Info')} />
          {this.state.isPlaying ? 
            <FontAwesomeIcon icon={faPauseCircle} size={28} color={"#24561F"} onPress={() => this.stopSong()}/> :
            <FontAwesomeIcon icon={faPlay} size={25} color={"#24561F"} onPress={() => this.playSong()}/>
          }
          <FontAwesomeIcon icon={faBookmark} size={25} color={"#24561F"}/>
          <FontAwesomeIcon icon={faBook} size={25} color={"#24561F"}/>
          <FontAwesomeIcon icon={faTools} size={25} color={"#24561F"}/>

          <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        </View>
      );
    }
  }
  
  export default AppHeader;

  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    header: {
      height: 40,
      paddingVertical: 8,
      paddingHorizontal: 25,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    spinnerTextStyle: {
      color: '#FFF'
    },
  })