import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

class BookMarkComponent extends Component{
    constructor(){
        super();
      }

    render(){
      return(
        <View>
          <ScrollView>
              <Text>BookMarks</Text>
          </ScrollView>
        </View>
        
      );
    }
  }
  
  export default BookMarkComponent;

  const styles = StyleSheet.create({
    container: {
      flex: 1
    }
  })