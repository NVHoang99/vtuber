import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as actions from '../actions/userAction';
import * as api from '../../api/userApi';
import * as types from '../constants/actionTypes';

function* login(action) {
    try {
        const { token, navigate, from } = action.payload;
        const user = yield call(api.login, { token });

        yield put(actions.userLoggedInAction(user));

        navigate(from);
    } catch (error) {
        console.log(error);
    }
}

function* logout() {
    yield call(api.logout);
    yield put(actions.userLoggedOutAction);
}

function* fetchUserByToken() {
    try {
        const user = yield call(api.fetchUserByToken);
        yield put(actions.userLoggedInAction(user));
    } catch (error) {
        console.log(error);
    }
}

function* watchLoginAction() {
    yield takeLatest(types.LOGIN_USER, login);
}

function* watchLogoutAction() {
    yield takeLatest(types.LOGOUT_USER, logout);
}

function* watchFetchUserAction() {
    yield takeLatest(types.FETCH_USER_BY_TOKEN, fetchUserByToken);
}

function* userSaga() {
    yield all([
        watchLoginAction(),
        watchLogoutAction(),
        watchFetchUserAction(),
    ]);
}

export default userSaga;
