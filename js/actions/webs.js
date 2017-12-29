export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export function requestPosts(reddit) {
    return {
        type: REQUEST_POSTS,
        reddit
    };
}

export function receivePosts(reddit, json) {
    return {
        type: RECEIVE_POSTS,
        reddit,
        posts: json.data.children.map(child=>child.data),
        receivedAt: Date.now()
    };
}

export function fetchPosts(reddit) {
    return dispatch=> {
        dispatch(requestPosts(reddit));

        return fetch(`http://www.reddit.com/r/${reddit}.json`)
            .then(response=>response.json())
            .then(json=>{
                dispatch(receivePosts(reddit, json));
            });
    };
}