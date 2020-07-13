import React, { Component } from 'react'
import {TouchableOpacity, Text, View, StyleSheet, Image, SafeAreaView, TextInput, FlatList} from 'react-native'
import Title from './../components/Title.js'

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1
    },
    smallContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    bigContainer: {
        flex: 8
    },
    searchInput: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10
    },
    restaurant: {
        flex: 1,
        flexDirection: 'column',
        margin: 3,
        height: 180,
        borderRadius: 10,
        padding: 5
    },
    imgContainer: {
        flex: 4,
    },
    restaurantImg: {
        borderRadius: 20,
        flex: 1,
        height: undefined,
        width: undefined
    },
    restaurantFooter: {
        flex: 1,
        justifyContent: 'center',
    },
    restaurantText: {
        fontSize: 14,
        marginTop: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'sans-serif-condensed'
    }
})

const restaurants = require('../assets/restaurants.json')

export default class Home extends Component {
    restaurantItem = ({item}) => {
        return (
            <View style={styles.restaurant}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Restaurant', item)} style={styles.imgContainer}>
                    <Image style={styles.restaurantImg} source={{uri: item.img}}/>
                </TouchableOpacity>
                <View style={styles.restaurantFooter}>
                    <Text style={styles.restaurantText}>{item.name}</Text>
                </View>
            </View>
        )
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{...styles.smallContainer, ...styles.inputContainer}}>
                    <TextInput style={styles.searchInput} placeholder={'Buscar'}/>
                </View>
                <View style={styles.smallContainer}>
                    <Title text={'¡Pide a los mejores restaurantes!'}/>
                </View>
                <View style={styles.bigContainer}>
                    <FlatList
                        data={restaurants}
                        renderItem={restaurant => this.restaurantItem(restaurant)}
                        keyExtractor={restaurant => restaurant.id}
                        numColumns={2}
                    />
                </View>
            </SafeAreaView>
        )
    }
}