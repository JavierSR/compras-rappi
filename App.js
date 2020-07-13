import 'react-native-gesture-handler';
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './views/Home.js'
import Restaurant from './views/Restaurant.js'
import Basket from './views/Basket.js'

const Stack = createStackNavigator()
export default class Home extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Restaurant" component={Restaurant} />
                    <Stack.Screen name="Basket" component={Basket} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}