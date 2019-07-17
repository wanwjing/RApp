
//import liraries
import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';

// create a component
export class TopBotField extends Component {

    static propTypes = {
        title: PropTypes.string,
        onChangeText: PropTypes.func,
        value: PropTypes.string,
        placeholder: PropTypes.string,
    }

    render() {
        return (
            <View style={[{ flexDirection: "column" }]}>
                <Text style={{}}>{this.props.title}</Text>
                <TextInput
                    style={{ height : 40 }}
                    borderColor = '#7a42f4'
                    onChangeText={(text) => this.props.onChangeText(text)}
                    placeholder={this.props.placeholder} 
                    value = {this.props.value}/>
            </View>
        );
    }
}


