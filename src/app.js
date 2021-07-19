import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import './styles/base/base.css';
import StateLoader from './store/StateLoader';
// importing normalize.css file from normalize.css folder in node modules

const store = configureStore()
// create a new instance of Stateloader 
const stateLoader = new StateLoader()
// when redux store changes save the new store to localStorage
store.subscribe(() => {
    stateLoader.saveState(store.getState());
});

const jsx = (
    <Provider store = {store}>
        <AppRouter />
    </Provider>
)


ReactDOM.render( jsx, document.getElementById('app'))