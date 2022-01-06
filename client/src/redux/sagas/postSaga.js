import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as actions from '../actions/postAction';
import * as api from '../../api/postApi';
import * as types from '../constants/actionTypes';

//worker saga
function* fetchPostSaga(action) {
    try {
        const posts = yield call(api.fetchPosts, action.payload);
        yield put(actions.getPostsSuccess(posts));
    } catch (error) {
        console.log(error);
    }
}

function* savePostSaga(action) {
    try {
        const result = yield call(api.savePost, action.payload);
        if (result) yield put(actions.savePostsSuccess());
    } catch (error) {
        console.log(error);
    }
}

//watcher saga
function* watchGetPostsAction() {
    yield takeLatest(types.GET_POST_REQUEST, fetchPostSaga);
}

function* watchSavePostAction() {
    yield takeLatest(types.SAVE_POST_REQUEST, savePostSaga);
}

function* postSaga() {
    yield all([watchGetPostsAction(), watchSavePostAction()]);
}

export default postSaga;
