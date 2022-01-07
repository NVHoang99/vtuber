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
        const savedpost = yield call(api.savePost, action.payload);
        yield put(actions.savePostSuccess(savedpost));
    } catch (error) {
        console.log(error);
    }
}

function* unSavePostSaga(action) {
    try {
        const unSavePost = yield call(api.unSavePost, action.payload);
        yield put(actions.unSavePostSuccess(unSavePost));
    } catch (error) {
        console.log(error);
    }
}

function* createPostSaga(action) {
    try {
        const post = yield call(api.createPost, action.payload.post);
        yield put(
            actions.createPostSuccess({ post, user: action.payload.user })
        );
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

function* watchUnSavePostAction() {
    yield takeLatest(types.UNSAVE_POST_REQUEST, unSavePostSaga);
}

function* watchCreatePostAction() {
    yield takeLatest(types.CREATE_POST_REQUEST, createPostSaga);
}

function* postSaga() {
    yield all([
        watchGetPostsAction(),
        watchSavePostAction(),
        watchUnSavePostAction(),
        watchCreatePostAction(),
    ]);
}

export default postSaga;
