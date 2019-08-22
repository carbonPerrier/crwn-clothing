import {createStore, compose} from 'redux';
import rootReducer from './root-reducer';
import { persistStore} from 'redux-persist';

import {logger} from 'redux-logger';
import { applyMiddleware } from 'redux';


const middlewares = [logger];

export const store = createStore(rootReducer
                                ,compose(applyMiddleware(...middlewares),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
                                );

export const persistor = persistStore(store);