import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { CookiesProvider } from 'react-cookie';
import createSagaMiddleware from 'redux-saga';
import App from './App';
import './index.css';
import reducers from './redux/reducers';
import rootSaga from './redux/sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <CookiesProvider>
                <App />
            </CookiesProvider>
        </Router>
    </Provider>,
    document.getElementById('root')
);
