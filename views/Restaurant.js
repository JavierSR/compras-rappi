import React, { Component } from 'react'
import {TouchableOpacity, Text, View, StyleSheet, Image, FlatList} from 'react-native'
import Product from './../components/Product.js'
import Title from './../components/Title.js'

const styles = StyleSheet.create({
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    menuText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    menuContainer: {
        flex: 4,
        padding: 10
    },
    basketContainer: {
        flex: 1,
        justifyContent: 'center',
        borderTopWidth: 10,
    },
    productContent: {
        flex: 4,
        justifyContent: 'center'
    },
    productName: {
        fontSize: 30,
        textAlign: 'center'
    },
    productPrice: {
        fontSize: 15,
        textAlign: 'center'
    },
    bottomContent: {
        flexDirection: 'row',
        flex: 1
    },
    operatorsContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    operators: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#CECECE',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    containerAdd: {
        flex: 1,
        padding: 15,
        justifyContent: 'center'
    },
    addProduct: {
        backgroundColor: 'orange',
        borderRadius: 8,
        padding: 10
    },
    strongText: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    quantityText: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#CECECE',
        padding: 8,
        textAlign: 'center'
    },
    symbols: {
        flex: 2,
        justifyContent: 'center'
    }
})

export default class Restaurant extends Component {
    toggleProductScreen = () => {
        this.setState({showProduct: !this.state.showProduct})
    }
    handleProductPress = (product) => {
        this.setState({
            selectedProduct: product
        })
        this.toggleProductScreen()
    }
    updateAmount = () => {
        let amount = 0
        for(const value of this.state.basket) {
            amount += value.product.price * value.count 
        }
        this.setState({amount})
    }
    addProducts = () => {
        this.toggleProductScreen()
        let basket = this.state.basket
        basket = [...basket, {
            product: this.state.selectedProduct,
            count: this.state.quantity
        }]
        this.setState({
            basket: basket,
            quantity: 0
        }, () => {
            this.updateAmount()
        })
    }
    renderProduct = ({item}) => (
        <Product onPressFn={this.handleProductPress} item={item} color={this.props.route.params.color}/>
    )
    renderBody = () => {
        const add = () => {
            this.setState({quantity: this.state.quantity + 1})
        }
        const subtract = () => {
            if(this.state.quantity) {
                this.setState({quantity: this.state.quantity - 1})
            }
        }
        if(this.state.showProduct) {
            return(
                <View style={styles.menuContainer}>
                    <View style={styles.productContent}>
                        <Text style={styles.productName}>{this.state.selectedProduct.description}</Text>
                        <Text style={styles.productPrice}>${this.state.selectedProduct.price}/u</Text>
                    </View>
                    <View style={styles.bottomContent}>
                        <View style={styles.operatorsContainer}>
                            <View style={styles.operators}>
                                <TouchableOpacity onPress={() => subtract()} style={styles.symbols}>
                                    <Text style={styles.strongText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>{this.state.quantity}</Text>
                                <TouchableOpacity onPress={() => add()} style={styles.symbols}>
                                    <Text style={styles.strongText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.containerAdd}>
                            <TouchableOpacity onPress={() => this.addProducts()} style={styles.addProduct}>
                                <Text style={styles.strongText}>Agregar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }
        else {
            return(
                <View style={styles.menuContainer}>
                    <Text style={styles.menuText}>Menu</Text>
                    <FlatList
                        data={this.props.route.params.menu}
                        renderItem={this.renderProduct}
                        keyExtractor={(item, index) => String(index)}
                        numColumns={1}
                    >
                    </FlatList>
                </View>
            )
        }
    }
    state = {
        showProduct: false,
        selectedProduct: {},
        quantity: 0,
        amount: 0,
        basket: []
    }   
    render() {
        const params = this.props.route.params
        return(
            <View style={{flex: 1}}>
                <View style={{flex: 3}}>
                    <Image style={styles.image} source={{uri: params.img}}/>
                </View>
                {this.renderBody()}
                <View style={{
                    ...styles.basketContainer, 
                    borderTopColor: params.color,
                }}>
                    <Title text={params.name}/>
                    <View style={styles.bottomContent}>
                        <Text style={{flex: 1, textAlign: 'center', marginTop: 15}}>Pedido actual ${this.state.amount}</Text>
                        <View style={styles.containerAdd}>
                            <TouchableOpacity 
                                onPress={() => this.props.navigation.navigate('Basket', {basket: this.state.basket, amount: this.state.amount})} 
                                style={{...styles.addProduct}}>
                                <Text style={styles.strongText}>Ver canasta</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}