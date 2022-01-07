import {
    GET_POST_SUCCESS,
    SAVE_POST_SUCCESS,
    UNSAVE_POST_SUCCESS,
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
