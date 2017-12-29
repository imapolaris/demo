import {combineReducers} from 'redux';
import {SELECT_REDDIT, INVALIDATE_REDDIT} from "../actions/reddits";
import {REQUEST_POSTS, RECEIVE_POSTS, fetchPosts} from "../actions/webs"

function selectedReddit(state='reactjs', action) {
    switch (action.type) {
        case SELECT_REDDIT:
            return action.reddit;
        default:
            return state;
    }
}

function posts(state={
    isFetching: false,
    didInvalidate: false,
    items: []}, action) {

    switch (action.type) {
        case INVALIDATE_REDDIT:
            return Object.assign({}, state, {didInvalidate: true});
        case REQUEST_POSTS:
            return Object.assign({}, state, {isFetching:true, didInvalidate: false});
        case RECEIVE_POSTS:
            return Object.assign({}, state, {isFetching: false, didInvalidate: false, items: action.posts, lastUpdated: action.receiveAt});
        default:
            return state;
    }
}

function postsByReddit(state={}, action) {
    switch (action.type) {
        case INVALIDATE_REDDIT:
        case RECEIVE_POSTS:
        case REQUEST_POSTS:
            return Object.assign({}, state, {[action.reddit]: posts(state[action.reddit], action)});
        default:
            return state;
    }
}

export function shouldFetchPosts(state, reddit) {
    const posts = state.postsByReddit[reddit];
    if (!posts){
        return true;
    } else if (posts.isFetching) {
        return false;
    } else {
        return posts.didInvalidate;
    }
}

export function fetchPostsIfNeeded(reddit) {
    return (dispatch, getState)=> {
        if (shouldFetchPosts(getState(), reddit)) {
            return dispatch(fetchPosts(reddit));
        } else {
            return Promise.resolve();
        }
    }
}

const rootReducer = combineReducers({
    postsByReddit,
    selectedReddit
});

export default rootReducer;