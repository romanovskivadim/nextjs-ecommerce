import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../index";
import { IFullOrder } from "@/types/IFullOreder";
import { getOrders } from "@/utils/api";
import localStoreHelper from "@/utils/localStoreHelper";
import { LOCAL_STORAGE_KEYS } from "@/utils/constanats";
import { IUser } from "@/types/IUser";

interface OrdersState {
  orders: IFullOrder[];
  isLoading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  isLoading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<IFullOrder[]>) => {
      state.orders = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setOrders, setLoading, setError } = ordersSlice.actions;

export const fetchOrders = (): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));
  const user = localStoreHelper.getLocalStorageItem<IUser>(
    LOCAL_STORAGE_KEYS.user
  );
  if (!user) return;
  try {
    const orders = await getOrders(user);
    dispatch(setOrders(orders));
  } catch (e) {
    dispatch(setError("Error fetching orders"));
  }
};

export default ordersSlice;
