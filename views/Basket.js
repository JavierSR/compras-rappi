import React, { Component } from 'react'
import {Text, View, StyleSheet, FlatList} from 'react-native'
import Title from './../components/Title.js'
import Product from './../components/Product.js'

const styles = StyleSheet.create({
    flatListContainer: {
        flex: 8,
        padding: 10
    },
    footer: {
        flex: 1,
        backgroundColor: '#dfdfdf',
        justifyContent: 'center'
    }
})

export default class Basket extends Component {
    renderProduct = ({item}) => (
        <Product item={item} color='orange'/>
    )
    render() {
        return(
            <View style={{flex: 1}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Title text='Mi pedido'/>
                </View>
                <View style={styles.flatListContainer}>
                    <FlatList
                        data={this.props.route.params.basket}
                        renderItem={this.renderProduct}
                        keyExtractor={(item, index) => String(index)}
                        numColumns={1}
                    >
                    </FlatList>
                </View>
                <View style={styles.footer}>
                    <Text style={{textAlign: 'right', paddingRight: 10}}>Total a pagar: ${this.props.route.params.amount}</Text>
                </View>
            </View>
        )
    }
}