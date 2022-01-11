import {
    GET_POST_SUCCESS,
    SAVE_POST_SUCCESS,
    UNSAVE_POST_SUCCESS,
    CREATE_POST_SUCCESS,
    ADD_COMMENT_SUCCESS,
} from '../constants/actionTypes';

const initialState = [];

export default function postsReducers(state = initialState, action) {
    switch (action.type) {
        case GET_POST_SUCCESS:
            return action.payload;
        case SAVE_POST_SUCCESS:
        case UNSAVE_POST_SUCCESS:
        case ADD_COMMENT_SUCCESS:
            let newArr = state.map((item) => {
                if (item.post._id === action.payload._id) {
                    item.post = action.payload;
                }
                return item;
            });
            return newArr;
        case CREATE_POST_SUCCESS:
            return [...state, action.payload];

        default:
            return state;
    }
}
