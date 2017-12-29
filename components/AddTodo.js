import React, {Component} from 'react';
import {View, Button, TextInput, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class AddTodo extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            text: ''
        };
      }

    _handleClick = ()=>{
        this.props.onAddClick(this.state.text);
        this.setState({text:''});
    };

    render() {
        return (
            <View>
                <TextInput value={this.state.text}
                           onChangeText={(text)=>{
                               this.setState({text: text});
                           }} />
                <Button onPress={this._handleClick} title="Add" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
});

AddTodo.PropTypes = {
    onAddClick: PropTypes.func.isRequired
};