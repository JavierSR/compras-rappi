import React, { Component } from 'react'
import {Text} from 'react-native'
export default class Restaurant extends Component {
    render() {
        return (
        <Text 
            style={{textAlign: 'center',
                    fontSize: 20,
                    fontFamily: 'sans-serif-condensed'}}
        >{this.props.text}</Text>
        )
    }
}