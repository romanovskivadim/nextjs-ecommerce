import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import productsSlice from "./reducers/products";
import ordersSlice from "./reducers/orders";

export const makeStore = () =>
  configureStore({
    reducer: {
      products: productsSlice.reducer,
      orders: ordersSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(thunkMiddleware),
  });

export type RootState = ReturnType<any>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  any
>;

export const wrapper = createWrapper(makeStore, { debug: false });
