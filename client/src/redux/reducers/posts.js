import { INITIAL_STATE } from '../../constants';
import {
    GET_POST_REQUEST,
    GET_POST_SUCCESS,
    GET_POST_FAILURE,
} from '../constants/actionTypes';

export default function postsReducers(state = INITIAL_STATE.posts, action) {
    switch (action.type) {
        case GET_POST_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case GET_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case GET_POST_FAILURE:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}
