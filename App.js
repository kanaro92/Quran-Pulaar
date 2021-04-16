import React, {Component} from 'react';
import {Animated, Image, SafeAreaView, StyleSheet, View} from 'react-native';
import sourates from './sourates';
import AppHeader from './screens/AppHeader';
import Content from './screens/ContentComponent';

class QuranPulaarApp extends Component {
    constructor() {
        super();
        this.state = {
            isPlaying: false,
            spinner: false,
        }
    }

    //const scrollX = React.useRef(new Animated.Value(0)).current
    //RNRestart.Restart();
    render() {
        return (
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
                <AppHeader/>
                <Animated.FlatList
                    data={sourates}
                    keyExtractor={(_, index) => index}
                    horizontal
                    pagingEnabled
                    renderItem={({item}) => {
                        return <View>
                            <Content item={item}/>
                        </View>
                    }}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default QuranPulaarApp;
