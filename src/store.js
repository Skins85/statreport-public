import { combineReducers, createStore } from 'redux';

const reducers = {};
 
const rootReducer = combineReducers(reducers); // Prepares reducers into a form they can be passed to createStore function
 
export const configureStore = () => createStore(rootReducer);