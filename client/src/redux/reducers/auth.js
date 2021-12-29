import { INITIAL_STATE } from '../../constants';
import { GOOGLE_AUTH, GOOGLE_LOGOUT } from '../constants/actionTypes';

export default function authReducer(state = INITIAL_STATE.google_auth, action) {
    switch (action.type) {
        case GOOGLE_AUTH:
            localStorage.setItem('user', JSON.stringify({ ...action.payload }));
            return {
                ...state,
                authData: action.payload,
            };
        case GOOGLE_LOGOUT:
            localStorage.clear();
            return {
                ...state,
                authData: null,
            };
        default:
            return state;
    }
}
