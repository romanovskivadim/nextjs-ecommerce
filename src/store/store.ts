import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import productsSlice from "./reducers/products";
import ordersSlice from "./reducers/orders";

const middleware = [...getDefaultMiddleware(), thunkMiddleware];

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    orders: ordersSlice.reducer,
  },
  middleware,
});

export default store;
