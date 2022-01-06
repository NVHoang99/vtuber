import { GET_POST_SUCCESS, SAVE_POST_SUCCESS } from '../constants/actionTypes';

export function getPostsSuccess(payload) {
    return {
        type: GET_POST_SUCCESS,
        payload,
    };
}

export function savePostsSuccess() {
    return {
        type: SAVE_POST_SUCCESS,
    };
}
