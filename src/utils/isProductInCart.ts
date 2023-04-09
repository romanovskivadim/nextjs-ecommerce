import { IProduct } from "@/types/IProduct";

export const isProductInCart = (
  products: IProduct[],
  currentProduct: string
) => {
  return products.find((item) => item.id === Number(currentProduct));
};
