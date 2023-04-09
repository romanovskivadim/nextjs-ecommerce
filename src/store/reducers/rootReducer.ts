import ordersSlice from "./orders";
import productsSlice from "./products";

export const rootReducer = {
  products: productsSlice.reducer,
  orders: ordersSlice.reducer,
};
