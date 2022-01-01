import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as actions from '../actions/userAction';
import * as api from '../../api/userApi';
import * as types from '../constants/actionTypes';

function* login(payload) {
    try {
        const user = yield call(api.login, payload);
        yield put(actions.userLoggedInAction(user));
    } catch (error) {
        console.log(error);
    }
}

function* logout() {
    yield call(api.logout);
    yield put(actions.userLoggedOutAction);
}

function* watchLoginAction() {
    yield takeLatest(types.LOGIN_USER, login);
}

function* watchLogoutAction() {
    yield takeLatest(types.LOGOUT_USER, logout);
}

function* userSaga() {
    yield all([watchLoginAction(), watchLogoutAction()]);
}

export default userSaga;
