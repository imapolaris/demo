import React, {Component} from 'react';
import {connect} from 'react-redux';
import MyPicker from './components/Picker';
import Posts from './components/Posts';
import {fetchPostsIfNeeded} from "./js/reducers/reddit_reducers";
import {invalidateReddit, selectReddit} from "./js/actions/reddits";
import {Button, Text, View} from "react-native";
import PropTypes from 'prop-types';


class AsyncApp extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    componentDidMount() {
        const {dispatch, selectedReddit} = this.props;
        dispatch(fetchPostsIfNeeded(selectedReddit));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedReddit !== this.props.selectedReddit) {
            const {dispatch, selectedReddit} = nextProps;
            dispatch(fetchPostsIfNeeded(selectedReddit));
        }
    }

    _handleChange = ()=>{
        this.props.dispatch(selectReddit(nextReddit));
    };

    _handleRefreshClick = ()=>{
        const {dispatch, selectedReddit} = this.props;
        dispatch(invalidateReddit(selectedReddit));
        dispatch(fetchPostsIfNeeded(selectedReddit));
    };

    render() {
        const {selectedReddit, posts, isFetching, lastUpdated} = this.props;

        return (
            <View>
                <MyPicker options={posts} value={selectedReddit} onChange={this._handleChange}/>
                {
                    lastUpdated && <Text>Last updated at {new Date(lastUpdated).toLocaleTimeString()} {'\r\n'}</Text>
                }
                {
                    !isFetching && <Button title="Refresh" onPress={this._handleRefreshClick} />
                }
                {
                    !isFetching && posts.length === 0 && <Text>Loading...</Text>
                }
                {
                    !isFetching && posts.length === 0 && <Text>Empty.</Text>
                }
                {
                    posts.length > 0 && 
                        <View style={{opacity: isFetching ? 0.5 : 1}}>
                            <Posts posts={posts}/>
                        </View>
                }
            </View>
        );
    }
}

AsyncApp.propTypes = {
    selectedReddit: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const {selectedReddit, postsByReddit} = state;
    const {
        isFetching,
        lastUpdated,
        items: posts
    } = postsByReddit[selectedReddit] || {isFetching: true, items:[]};

    return {
        selectedReddit,
        posts,
        isFetching,
        lastUpdated
    };
}

export default connect(mapStateToProps)(AsyncApp);