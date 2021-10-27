// redux
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
// redux thunk
import thunk from 'redux-thunk';
// redux persist
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// Reducer admin
import InfoReducer from './Reducers/Admin/InfoReducer';
import CategoriesReducer from '../layouts/Admin/Categories/modules/CategoriesReducer';
import PostReducer from '../layouts/Admin/Post/modules/PostReducer';
import DiscountReducer from '../layouts/Admin/Discount/modules/DiscountReducer';
import UserReducer from '../layouts/Admin/User/modules/UserReducer';
import ProductReducer from '../layouts/Admin/Product/modules/ProductReducer';
import ProductVariantReducer from '../layouts/Admin/ProductVariant/modules/ProductVariantReducer';
import InventoryReducer from '../layouts/Admin/Inventory/modules/InventoryReducer';
import OrderReducer from '../layouts/Admin/Order/modules/OrderReducer';
import DashBoardReducer from '../layouts/Admin/Dashboard/modules/DashBoardReducer';
import MessagesReducer from './Reducers/MessagesReducer';
import authReducer from './Reducers/Admin/authReducer';
// Reducer client
import HomeReducer from '../layouts/Client/Home/Modules/HomeReducer';
import CartReducer from './Reducers/User/CartReducer';
import RegisterReducer from './Reducers/User/RegisterReducer';
import ProductDetailReducer from '../layouts/Client/Detail/Modules/ProductDetailReducer';
import ReviewReducer from '../layouts/Admin/Review/modules/ReviewReducer';
import ProductClientReducer from '../layouts/Client/Products/Modules/ProductClientReducer';
import PurchaseReducer from '../layouts/Client/Account/Modules/PurchaseReducer';

const rootReducer = combineReducers({
    // admin
    InfoReducer,
    CategoriesReducer,
    PostReducer,
    DiscountReducer,
    UserReducer,
    ProductReducer,
    ProductVariantReducer,
    InventoryReducer,
    ReviewReducer,
    OrderReducer,
    DashBoardReducer,
    MessagesReducer,
    authReducer,
    // client
    HomeReducer,
    CartReducer,
    RegisterReducer,
    ProductDetailReducer,
    ProductClientReducer,
    PurchaseReducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['authReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));

const store = createStore(persistedReducer, applyMiddleware(thunk));

const persistor = persistStore(store);

export { persistor, store };