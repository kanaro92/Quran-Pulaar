import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

class InfoComponent extends Component{
    constructor(){
        super();
      }

    render(){
      return(
        <View>
          <ScrollView style={styles.container}>
              <Text>
                  Info
              </Text>
          </ScrollView>
        </View>
        
      );
    }
  }
  
  export default InfoComponent;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
  })