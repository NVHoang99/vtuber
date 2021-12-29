import { INITIAL_STATE } from '../../constants';
import * as PostActionType from '../constants/PostActionType';

export default function postsReducers(state = INITIAL_STATE.posts, action) {
    switch (action.type) {
        case PostActionType.GET_POST_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case PostActionType.GET_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case PostActionType.GET_POST_FAILURE:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}
