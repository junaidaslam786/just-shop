import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import { setupListeners } from "@reduxjs/toolkit/query";
import productsReducer from '../features/products/productSlice.js'
// import { userApi } from './api/userApi'
// import { authApi } from './api/authApi';

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(userApi.middleware, authApi.middleware),
})
setupListeners(store.dispatch);

export default store