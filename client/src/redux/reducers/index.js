import { combineReducers } from 'redux';
import postsReducers from './posts';
import authReducer from './auth';

export default combineReducers({
    postsReducers,
    authReducer,
});
