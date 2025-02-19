import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from "./Slices/Auth/index";
import shopReducer from "./Slices/Shop/index";
import productReducer from "./Slices/Product/index";
import userReducer from "./Slices/User/index";
import wishlistReducer from "./Slices/Wishlist/index";
import cartReducer from "./Slices/Cart/index";
import orderReducer from "./Slices/Order/index";
import countryStateReducer from "./Slices/CountryState/index";
import reviewsReducer from './Slices/Reviews/index';
import vendorOrderReducer from './Slices/VendorOrder/index';
import packageReducer from "./Slices/Package/index"
import notificationsReducer from "./Slices/Notifications/index";
import chatReducer from "./Slices/Chat/index";
import pusherReducer from "./Slices/Pusher/index";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  shop: shopReducer,
  product: productReducer,
  wishlist: wishlistReducer,
  cart: cartReducer,
  order: orderReducer,
  countryState: countryStateReducer,
  reviews: reviewsReducer,
  user: userReducer,
  vendorOrder: vendorOrderReducer,
  package: packageReducer,
  notifications: notificationsReducer,
  chat: chatReducer,
  pusher: pusherReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // thunk: {},
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);