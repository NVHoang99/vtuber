import * as PostActionType from '../constants/PostActionType';

export function getPostsRequest() {
    return {
        type: PostActionType.GET_POST_REQUEST,
    };
}

export function getPostsSuccess(payload) {
    return {
        type: PostActionType.GET_POST_SUCCESS,
        payload,
    };
}

export function getPostsFailure(err) {
    return {
        type: PostActionType.GET_POST_FAILURE,
        err,
    };
}
