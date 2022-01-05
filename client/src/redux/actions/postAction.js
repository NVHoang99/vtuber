import {
    GET_POST_REQUEST,
    GET_POST_SUCCESS,
    GET_POST_FAILURE,
} from '../constants/actionTypes';

export function getPostsRequest(payload) {
    return {
        type: GET_POST_REQUEST,
        payload,
    };
}

export function getPostsSuccess(payload) {
    return {
        type: GET_POST_SUCCESS,
        payload,
    };
}

export function getPostsFailure(err) {
    return {
        type: GET_POST_FAILURE,
        err,
    };
}
