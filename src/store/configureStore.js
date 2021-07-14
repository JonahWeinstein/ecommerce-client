import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import storeReducer from '../reducers/storeReducer';

// used to compose our redux dev tools with applyMiddleware call (createStore only takes 2 args)


export default () => {
    // store creation
    // second argument to createStore allows us to use redux devtools (see https://extension.remotedev.io/#usage for more)
const store = createStore(
    // combineReducers takes an object as argument with each field in state and the reducer to handle that field
    combineReducers({
        stores:storeReducer
    }),
    composeWithDevTools(applyMiddleware(thunk))
)

return store;
}