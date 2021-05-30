import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from "@react-native-community/async-storage";
import {appService} from "../service/app-service";

export let bookmarksList;
bookmarksList = [];

class BookMarkComponent extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <View style={styles.sommaire_view}>
                        <Text style={styles.sommaire_title}>Maantooje</Text>
                    </View>
                    <ScrollView>
                        {bookmarksList ?

                            <View style={styles.list_view}>
                                <FlatList
                                    data={bookmarksList}
                                    keyExtractor={item => item.page_number.toString()}
                                    renderItem={({item}) => {
                                        return <TouchableOpacity onPress={() => this.onItemSelect(item.page_number)}>
                                            <View style={styles.item_view}>

                                                <View style={styles.pr_title_width}>
                                                    <Text style={styles.pr_title_text}>{item.pr_title}</Text>
                                                </View>
                                                <View style={styles.number_width}>
                                                    <Text>Hello {item.page_number} الصفحة </Text>
                                                </View>
                                                <View style={styles.ar_title_width}>
                                                    <Text style={styles.ar_title_text}>{item.ar_title}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    }}
                                    ItemSeparatorComponent={() => (
                                        <View style={styles.separator}/>
                                    )}
                                />
                            </View>
                            :
                            <Text>A suwa maantaade tawo!</Text>
                        }
                    </ScrollView>
                </View>
            </View>

        );
    }

    getBookmarks = async () => {
        try {
            const values = await AsyncStorage.getItem('bookmarks');
            if (values !== null) {
                bookmarksList = JSON.parse(values);
            }
        } catch (error) {
            alert(error)
        }
    }

    onItemSelect(page_number) {
        appService.setIndexSubject(page_number - 1);
    }

    componentDidMount() {
        this.getBookmarks().then();
    }
}

export default BookMarkComponent;


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 5
    },
    list_view: {
        paddingBottom: 15,
    },
    item_view: {
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'stretch',
        paddingTop: 4,
        paddingBottom: 4,
    },
    sommaire_view: {
        alignItems: "center",
        padding: 4,
    },
    sommaire_title: {
        fontSize: 18,
        fontFamily: "sans-serif-medium",
        fontWeight: 'normal',
    },
    pr_title_width: {
        width: 180,
    },
    ar_title_width: {
        width: 100,
    },
    number_width: {
        width: 120,
    },
    pr_title_text: {
        fontSize: 13,
    },
    ar_title_text: {
        fontSize: 16,
    },
    separator: {
        width: "100%",
        height: 1,
        backgroundColor: "#f8F4F4"
    },
})
