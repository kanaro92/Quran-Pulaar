import React, {Component} from 'react';
import {
    Image, Animated, View,
    StyleSheet , SafeAreaView
} from 'react-native';
import RNRestart from 'react-native-restart';
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
    /*
    _onFinishedPlayingSubscription = null;
    _onFinishedLoadingSubscription = null;
    _onFinishedLoadingURLSubscription = null;
    componentWillUnmount() {
        this._onFinishedPlayingSubscription.remove()
        this._onFinishedLoadingSubscription.remove()
        this._onFinishedLoadingURLSubscription.remove()
    }

    componentDidMount() {
        this._onFinishedPlayingSubscription = SoundPlayer.addEventListener('FinishedPlaying', ({ success }) => {
            this.setState({
                isPlaying: false
            });
            SoundPlayer.unmount();
            this._onFinishedPlayingSubscription.remove()
            this._onFinishedLoadingSubscription.remove()
            this._onFinishedLoadingURLSubscription.remove()
            alert('finished playing', success)
        })
        this._onFinishedLoadingSubscription = SoundPlayer.addEventListener('FinishedLoading', ({ success }) => {
          console.log('finished loading', success)
        })
        this._onFinishedLoadingURLSubscription = SoundPlayer.addEventListener('FinishedLoadingURL', ({ success, url }) => {
          this.setState({
            spinner: false
        });
        })
    }
     */

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default QuranPulaarApp;
