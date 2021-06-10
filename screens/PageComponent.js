import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import sourates from "../sourates";
import {appService} from '../service/app-service';

class PageComponent extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <ScrollView>
                        <View style={styles.sommaire_view}>
                            <Text style={styles.sommaire_title}>Cimooje</Text>
                        </View>
                        <View style={styles.list_view}>
                            <FlatList
                                data={sourates}
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
                    </ScrollView>
                </View>
            </View>

        );
    }

    onItemSelect(page_number) {
        appService.setIndexSubject(page_number - 1);
    }
}

export default PageComponent;

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
