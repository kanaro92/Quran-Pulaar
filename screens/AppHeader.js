import React, { Component } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBook , faBookmark, faTools, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import RBSheet from "react-native-raw-bottom-sheet";
import InfoComponent from './InfoComponent';
import BookMarkComponent from './BookMarkComponent';
import PageComponent from './PageComponent';
import ToolComponent from './ToolComponent';

class AppHeader extends Component{
    constructor(){
        super();
      }

    render(){
      return(
        <View style={styles.header}>
          <FontAwesomeIcon icon={faInfoCircle} size={28} color={"#24561F"}
            onPress={() => this.infoRBSheet.open()}
          />
          <FontAwesomeIcon icon={faBookmark} size={25} color={"#24561F"}
            onPress={() => this.bookMarkRBSheet.open()}
          />
          <FontAwesomeIcon icon={faBook} size={25} color={"#24561F"}
            onPress={() => this.pageRBSheet.open()}
          />
          <FontAwesomeIcon icon={faTools} size={25} color={"#24561F"}
            onPress={() => this.toolsRBSheet.open()}
          />

          <RBSheet
            ref={ref => {
              this.infoRBSheet = ref;
            }}
            height={800}
            openDuration={250}
            closeOnDragDown={true}
            customStyles={{
              container: {
                justifyContent: "center",
                alignItems: "center"
              }
            }}
          >
            <InfoComponent />
          </RBSheet>

          <RBSheet
            ref={ref => {
              this.bookMarkRBSheet = ref;
            }}
            height={300}
            openDuration={250}
            customStyles={{
              container: {
                justifyContent: "center",
                alignItems: "center"
              }
            }}
          >
            <BookMarkComponent />
          </RBSheet>

          <RBSheet
              ref={ref => {
                this.pageRBSheet = ref;
              }}
              height={300}
              openDuration={250}
              customStyles={{
                container: {
                  justifyContent: "center",
                  alignItems: "center"
                }
              }}
            >
              <PageComponent />
            </RBSheet>

            <RBSheet
              ref={ref => {
                this.toolsRBSheet = ref;
              }}
              height={300}
              openDuration={250}
              customStyles={{
                container: {
                  justifyContent: "center",
                  alignItems: "center"
                }
              }}
            >
              <ToolComponent />
            </RBSheet>
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