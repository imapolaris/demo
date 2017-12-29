/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry, Modal, StatusBar, View, StyleSheet, Dimensions, Button
} from 'react-native';
import App from "./app";

import {applyMiddleware, createStore} from 'redux';
import todoApp from './js/reducers/reducers';
import {Provider} from "react-redux";

import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from "./js/reducers/reddit_reducers";
import AsyncApp from "./redditApp";
import ShowAlert from "./js/showAlert";
import ModalDemo from "./js/demo";

const loggerMiddleware = createLogger();
const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
)(createStore);

class SharedApp extends Component {
    render() {
      return (
          <Provider store={store}>
            <App/>
          </Provider>
      );
    }
}

function configureStore(initialState) {
    return createStoreWithMiddleware(rootReducer, initialState);
}

let store = configureStore();

class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <AsyncApp/>
            </Provider>
        );
    }
}

class ShowAlertApp extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {show: false, showSelf: false};
      }

    render() {
        return (
            <View style={{ alignItems: 'center', flex: 1, justifyContent:'center' }}>
                <StatusBar translucent={true} hidden={true}/>
                {/*<ShowAlert/>*/}

                <ModalDemo modalVisible={this.state.show} />

                <Modal
                    animationType={'none'}
                    transparent={true}
                    visible={this.state.showSelf}
                    onShow={() => {}}
                    onRequestClose={() => {}}>
                    {/*遮罩层*/}
                    <View style={styles.mask}>
                        <Button title="hide" onPress={()=>this.setState({show:false})} />
                    </View>


                </Modal>

                <Button style={{height: 30}} title="show" onPress={()=>this.setState({show:true})} />
            </View>
        );
    }
}

const {width, height} = Dimensions.get('window');
const [left, top] = [0, 0];

const styles = StyleSheet.create({
    mask: {
        justifyContent: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        padding: 40,

        /*position: "absolute",
        width: width,
        height: height,
        left: left,
        top: top,*/
    },
});

AppRegistry.registerComponent('SharedApp', () => ShowAlertApp);
