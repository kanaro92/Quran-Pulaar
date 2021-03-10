import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBook , faBookmark, faTools, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import SoundPlayer from 'react-native-sound-player';
import Spinner from 'react-native-loading-spinner-overlay';


class AppHeader extends Component{
    constructor(){
        super();
      }

    render(){
      return(
        <View style={styles.header}>
          <FontAwesomeIcon icon={faInfoCircle} size={28} color={"#24561F"} onPress={() => alert('Info')} />
          <FontAwesomeIcon icon={faBookmark} size={25} color={"#24561F"}/>
          <FontAwesomeIcon icon={faBook} size={25} color={"#24561F"}/>
          <FontAwesomeIcon icon={faTools} size={25} color={"#24561F"}/>
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
  })