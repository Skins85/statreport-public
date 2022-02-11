import { applyMiddleware, compose, createStore } from 'redux'

import { createBrowserHistory } from 'history';
import createRootReducer from './redux/reducers';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

export const history = createBrowserHistory();
const middleware = [thunk];

const initialState = {}

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history), // Root reducer with router state
    initialState,
    compose(
      applyMiddleware(
        ...middleware,
        routerMiddleware(history), // Dispatching history actions
      ),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ),
  )
  return store
}