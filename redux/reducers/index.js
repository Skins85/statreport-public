import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import counterReducer from './counterReducer';
import matchReducer from './matchReducer';

const createRootReducer = (history) => combineReducers({
    counter: counterReducer,
    match: matchReducer,
    router: connectRouter(history)
});

export default createRootReducer;