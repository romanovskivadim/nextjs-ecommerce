import { IProduct } from "@/types/IProduct";
import { LOCAL_STORAGE_KEYS } from "@/utils/constanats";
import localStoreHelper from "@/utils/localStoreHelper";
import { useEffect, useState } from "react";

export const useGetCartItems = (): [IProduct[], (arg: IProduct[]) => void] => {
    const [cartItems, setCartItems] = useState<IProduct[]>([]);

    useEffect(() => {
      const cartItemsFromStorage = localStoreHelper.getLocalStorageItem<IProduct[]>(LOCAL_STORAGE_KEYS.cart, []) as IProduct[];
      if (Boolean(cartItemsFromStorage.length)) {
        setCartItems(cartItemsFromStorage);
      }
    }, []);

    return [cartItems, setCartItems];
};
