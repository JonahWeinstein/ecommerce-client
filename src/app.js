import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import './styles/base/base.css';
// importing normalize.css file from normalize.css folder in node modules

const store = configureStore()

const jsx = (
    <Provider store = {store}>
        <AppRouter />
    </Provider>
)


ReactDOM.render( jsx, document.getElementById('app'))