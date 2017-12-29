import React, {Component} from 'react';
import Todo from './Todo';
import {FlatList} from 'react-native';
import PropTypes from 'prop-types';

export default class TodoList extends Component {
    render() {
        return (
            <FlatList data={this.props.todos.map((item, index)=> Object.assign({}, item, {key: index}))}
                      renderItem={({item})=><Todo {...item}
                                                  onClick={()=>this.props.onTodoClick(item.key)} />} />
        );
    }
}

TodoList.propTypes = {
    onTodoClick: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired).isRequired,
};