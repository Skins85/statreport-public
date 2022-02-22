import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import matchReducer from './matchReducer';

const createRootReducer = (history) => combineReducers({
    match: matchReducer,
    router: connectRouter(history)
});

export default createRootReducer;