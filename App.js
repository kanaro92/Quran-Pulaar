import React, {Component} from 'react';
import {Animated, Button, Image, SafeAreaView, StyleSheet, View} from 'react-native';
import sourates from './sourates';
import AppHeader from './screens/AppHeader';
import Content from './screens/ContentComponent';
import {appService} from './service/app-service';

class QuranPulaarApp extends Component {
    constructor() {
        super();
    }

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
                    ref={(ref) => {
                        this.flatListRef = ref;
                    }}
                    initialNumToRender={40}
                    keyExtractor={item => item.surat_number.toString()}
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

    scrollToIndex = (index: number) => {
        this.flatListRef.scrollToIndex({animated: true, index: index});
    }

    componentDidMount() {
        // subscribe to home component messages
        this.subscription = appService.getIndexSubject().subscribe(index => {
            if (index) {
                this.scrollToIndex(index);
            }
        });
    }

    componentWillUnmount() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default QuranPulaarApp;
