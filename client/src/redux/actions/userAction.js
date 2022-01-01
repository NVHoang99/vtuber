import {
    LOGIN_USER,
    USER_LOGGEDIN,
    LOGOUT_USER,
    USER_LOGGEDOUT,
} from '../constants/actionTypes';

export const loginUserAction = (payload) => {
    return {
        type: LOGIN_USER,
        payload,
    };
};

export const userLoggedInAction = (user) => {
    return {
        type: USER_LOGGEDIN,
        user,
    };
};

export const logoutUserAction = () => {
    return {
        type: LOGOUT_USER,
    };
};

export const userLoggedOutAction = () => {
    return {
        type: USER_LOGGEDOUT,
    };
};
