import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../index";
import { IProduct } from "@/types/IProduct";
import { getProducts } from "@/utils/api";

interface ProductsState {
  products: IProduct[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
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

export const { setProducts, setLoading, setError } = productsSlice.actions;

export const fetchProducts = (): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const products = await getProducts();
    dispatch(setProducts(products));
  } catch (e) {
    dispatch(setError("Error fetching products"));
  }
};

export default productsSlice;
