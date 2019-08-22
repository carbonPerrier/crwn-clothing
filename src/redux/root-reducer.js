
import {combineReducers} from 'redux';
import {userReducer} from './user/user.reducer.js';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';


import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';


const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['cart', 'directory'] // only navigation will be persisted
  };

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);