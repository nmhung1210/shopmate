import { createStore } from 'redux';
import rootReducer from './reducers';

const dataStore = createStore(rootReducer);

export default dataStore;
