import { takeLatest, call, put } from 'redux-saga/effects';
import * as actions from '../actions/postAction';
import * as api from '../../api/postApi';
import * as types from '../constants/actionTypes';

//worker saga
function* fetchPostSaga() {
    try {
        const posts = yield call(api.fetchPosts);
        yield put(actions.getPostsSuccess(posts));
    } catch (error) {
        console.log(error);
    }
}

//watcher saga
function* postSaga() {
    yield takeLatest(types.GET_POST_REQUEST, fetchPostSaga);
}

export default postSaga;
