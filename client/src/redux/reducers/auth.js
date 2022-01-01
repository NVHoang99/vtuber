import { USER_LOGGEDIN, USER_LOGGEDOUT } from '../constants/actionTypes';

const initialState = {};
export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case USER_LOGGEDIN:
            return {
                ...state,
                user: action.user,
            };
        case USER_LOGGEDOUT:
            return initialState;
        default:
            return state;
    }
}
