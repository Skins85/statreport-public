import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import counterReducer from './counterReducer';

const createRootReducer = (history) => combineReducers({
    counter: counterReducer,
    router: connectRouter(history)
});

export default createRootReducer;