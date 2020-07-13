import React, { Component } from 'react'
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native'
const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: 'gray',
        marginBottom: 10,
        padding: 15,
        flexDirection: 'row'
    },
    productName: {
        fontSize: 16
    },  
    price: {
        color: '#AAA'
    },
    addContainer: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 50
    },
    add: {
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
})

export default class Product extends Component {
    render() {
        const item = this.props.item
        if (item.product) {
            item.description = item.product.description
            item.price = item.product.price * item.count
        }
        return(
            <View style={styles.container}>
                <View style={{flex: 6.5}}>
                    <Text style={styles.productName}>{item.description}</Text>
                    <Text style={styles.price}>${item.price}</Text>
                </View>
                <TouchableOpacity 
                    onPress={() => this.props.onPressFn(item)} 
                    style={{...styles.addContainer, backgroundColor: this.props.color}}>
                    <Text style={styles.add}>{item.count || '+'}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}