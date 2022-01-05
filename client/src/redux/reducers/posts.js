import { GET_POST_SUCCESS } from '../constants/actionTypes';

const initialState = [];

export default function postsReducers(state = initialState, action) {
    switch (action.type) {
        case GET_POST_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
