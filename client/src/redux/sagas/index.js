import { takeLatest, call, put } from 'redux-saga/effects';
import * as actions from '../actions';
import * as api from '../../api';

function* fetchPostSaga() {
    const posts = yield call(api.fetchPosts);
    yield put(actions.getPostsSuccess(posts));
}

function* mySaga() {
    yield takeLatest(actions.getPostsRequest, fetchPostSaga);
}

export default mySaga;
