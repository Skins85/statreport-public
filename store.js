import { applyMiddleware, compose, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist';

import { createBrowserHistory } from 'history';
import createRootReducer from './redux/reducers';
import { routerMiddleware } from 'connected-react-router';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

export const history = createBrowserHistory();
const middleware = [thunk];

const persistConfig = {
  key: 'root',
  storage,
};
const persistedRootReducer = persistReducer(
  persistConfig,
  createRootReducer(history), 
);

const initialState = {}

export default function configureStore(preloadedState) {
  const store = createStore(
    persistedRootReducer, // Root reducer with router state
    initialState,
    compose(
      applyMiddleware(
        ...middleware,
        routerMiddleware(history), // Dispatching history actions
      ),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ),
  );
  const persistor = persistStore(store);
  return { store, persistor };
}
