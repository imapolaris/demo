import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, Text} from 'react-native';

export default class Posts extends Component {
    render() {
        return (
            <FlatList data={this.props.posts.map((item, index)=>Object.assign({}, item, {key: index}))}
                      renderItem={({item})=> <Text>{item.title}</Text>} />
        );
    }
}

Posts.propTypes = {
    posts: PropTypes.array.isRequired
};