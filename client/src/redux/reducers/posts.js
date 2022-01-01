import {
    GET_POST_REQUEST,
    GET_POST_SUCCESS,
    GET_POST_FAILURE,
} from '../constants/actionTypes';

const initialState = {
    isLoading: false,
    data: [],
};

export default function postsReducers(state = initialState, action) {
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
