import axios, { AxiosResponse } from 'axios';
import { ISignupPayload } from '@/types/ISignupPayload';
import { ILoginPayload } from '@/types/ILoginPayload';
import { IUserWithTokens } from '@/types/IUserWithTokens';
import { IProduct } from '@/types/IProduct';
import { useRouter } from 'next/router';
import { LOCAL_STORAGE_KEYS, PAGE_ROUTES } from './constanats';
import localStoreHelper from './localStoreHelper';
import { IOrderPayload } from '@/types/IOrderPayload';
import { IUser } from '@/types/IUser';
import { IFullOrder } from '@/types/IFullOreder';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // The URL of your backend server
});

api.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: any) => {

        console.log(error, "Work")


    if (error.response.status === 401) {
        const router = useRouter();

        await logout();

        router.push(PAGE_ROUTES.login);
      }
  
      return Promise.reject(error);
    },
  );

const BASE_URL = {
    auth: "/auth",
    products: "/products",
    orders: "/orders",
};

const API_ROUTES = {
    SIGN_UP: `${BASE_URL.auth}/sign-up`,
    LOG_IN: `${BASE_URL.auth}/sign-in`,
    LOG_OUT: `${BASE_URL.auth}/sign-out`,
    PRODUCTS: `${BASE_URL.products}`,
    PRODUCT: (id: string) => `${BASE_URL.products}/${id}`,
    ORDERS: `${BASE_URL.orders}`,
    ORDER: (id: string) => `${BASE_URL.orders}/${id}`,
}

export const signup = async (data: ISignupPayload): Promise<void> => {
    try {
      await api.post(API_ROUTES.SIGN_UP, data);
    } catch (error) {
      console.error(error);
    }
  }

  export const login = async (data: ILoginPayload): Promise<void> => {
      try {
        const response: AxiosResponse<IUserWithTokens> = await api.post(API_ROUTES.LOG_IN, data);

        localStoreHelper.setLocalStorageItem(LOCAL_STORAGE_KEYS.accessToken, response.data.accessToken);
        localStoreHelper.setLocalStorageItem(LOCAL_STORAGE_KEYS.refreshToken, response.data.refreshToken);
        localStoreHelper.setLocalStorageItem(LOCAL_STORAGE_KEYS.user, response.data.user);

      } catch (error) {
        console.error(error);

        throw new Error();
      }
    }

    export const logout = async (): Promise<void> => {
        try {
          await api.post(API_ROUTES.LOG_OUT);
  
          localStoreHelper.removeLocalStorageItem(LOCAL_STORAGE_KEYS.accessToken);
          localStoreHelper.removeLocalStorageItem(LOCAL_STORAGE_KEYS.refreshToken);
          localStoreHelper.removeLocalStorageItem(LOCAL_STORAGE_KEYS.user);
            
        } catch (error) {
          console.error(error);
        }
      }

export const getProducts = async (): Promise<IProduct[]> => {
    try {
      const { data } = await api.get<IProduct[]>(API_ROUTES.PRODUCTS);
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  export const getProduct = async (id: string): Promise<IProduct | null> => {
      try {
        const { data } = await api.get<IProduct>(API_ROUTES.PRODUCT(id));

        return data;
      } catch (error) {
        console.error(error);

        return null;
      }
    }

    export const createOrder = async (data: IOrderPayload): Promise<IProduct & { orderId: string }> => {
      const currentUser = localStoreHelper.getLocalStorageItem<IUser>(LOCAL_STORAGE_KEYS.user);

      try {
        const response: AxiosResponse<IProduct & { orderId: string }> = await api.post(API_ROUTES.ORDER(data.productId?.toString()), {
          ...data,
          user: currentUser,
        });

        return response.data;
      } catch (error) {
        console.error(error);

        throw new Error();
      }
    }

    export const getOrders = async (currentUser: IUser): Promise<IFullOrder[]> => {
      try {
        const response: AxiosResponse<IFullOrder[]> = await api.get(`${API_ROUTES.ORDERS}/${currentUser?.id}`);

        return response.data;
      } catch (error) {
        console.error(error);

        throw new Error();
      }
    }
