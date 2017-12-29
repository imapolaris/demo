import React, {Component} from 'react';
import {Text} from 'react-native';
import PropTypes from 'prop-types';

export default class Todo extends Component {
    render() {
        return (
            <Text onPress={this.props.onClick}
                  style={{textDecorationLine: this.props.completed ? 'line-through' : 'none'}}>
                {this.props.text}
            </Text>
        );
    }
}

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
};