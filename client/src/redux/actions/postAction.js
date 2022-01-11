import {
    GET_POST_SUCCESS,
    SAVE_POST_SUCCESS,
    UNSAVE_POST_SUCCESS,
    GET_RELATED_POST_SUCCESS,
    ADD_COMMENT_SUCCESS,
} from '../constants/actionTypes';

export function getPostsSuccess(payload) {
    return {
        type: GET_POST_SUCCESS,
        payload,
    };
}

export function savePostSuccess(payload) {
    return {
        type: SAVE_POST_SUCCESS,
        payload,
    };
}

export function unSavePostSuccess(payload) {
    return {
        type: UNSAVE_POST_SUCCESS,
        payload,
    };
}

export function createPostSuccess(payload) {
    return {
        type: UNSAVE_POST_SUCCESS,
        payload,
    };
}

export function getRelatedPostSuccess(payload) {
    return {
        type: GET_RELATED_POST_SUCCESS,
        payload,
    };
}

export function addCommentSuccess(payload) {
    return {
        type: ADD_COMMENT_SUCCESS,
        payload,
    };
}
