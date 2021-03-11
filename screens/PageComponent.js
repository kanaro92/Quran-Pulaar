import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

class PageComponent extends Component{
    constructor(){
        super();
      }

    render(){
      return(
        <View>
          <ScrollView>
              <Text>Page</Text>
          </ScrollView>
        </View>
        
      );
    }
  }
  
  export default PageComponent;

  const styles = StyleSheet.create({
    container: {
      flex: 1
    }
  })