import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxPromise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers';

const dataStore = createStore(rootReducer, composeWithDevTools(applyMiddleware(reduxThunk, reduxPromise)));

export default dataStore;
