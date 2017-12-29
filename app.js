'use strict';

import React, {Component} from 'react';
import {View, PermissionsAndroid, Button} from 'react-native';
import PropTypes from 'prop-types';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import {connect} from "react-redux";
import {addTodo, completeTodo} from "./js/actions/todos";
import {setVisibilityFilter, VisibilityFilters} from "./js/actions/visiblefilter";
import {requestPermission} from "./js/permissions";


class App extends Component {
    _requestCameraPermission = async () => {

    };

    _checkCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: '申请摄像头权限',
                    message: '请让我们用啦...'
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                alert('agreed');
            } else {
                alert('denied');
            }
        } catch (err) {
            alert('something is wrong!' + err);
        }
    };

    render() {
        const {dispatch, visibleTodos, visibilityFilter} = this.props;

        return (
            <View>
                {/*<AddTodo onAddClick={text=>dispatch(addTodo(text))} />*/}
                {/*<TodoList onTodoClick={index=>dispatch(completeTodo(index))}*/}
                          {/*todos={visibleTodos}/>*/}
                {/*<Footer onFilterChange={nextFilter=>dispatch(setVisibilityFilter(nextFilter))}*/}
                        {/*filter={visibilityFilter}/>*/}

                <Button title="Check Camera Permission" onPress={()=>requestPermission('camera')} />
                <Button title="Check Location Permission" onPress={()=>requestPermission('location')} />
                <Button title="Check Photo Permission" onPress={()=>requestPermission('photo')} />
            </View>
        );
    }
}

App.propTypes = {
    visibleTodos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired).isRequired,
    visibilityFilter: PropTypes.oneOf([
        'SHOW_ALL',
        'SHOW_COMPLETED',
        'SHOW_ACTIVE'
    ]).isRequired
};

function selectTodos(todos, filter) {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos;
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(todo=>todo.completed);
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(todo=>!todo.completed);
        default:
            return todos;
    }
}

function select(state) {
    return {
        visibleTodos: selectTodos(state.todos, state.visibilityFilter),
        visibilityFilter: state.visibilityFilter
    }
}

export default connect(select)(App);