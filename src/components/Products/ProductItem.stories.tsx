import { Story } from "@storybook/react";
import React from "react";
import { IProduct } from "@/types/IProduct";
import ProductItem from "./ProductItem";
import { IFullOrder } from "@/types/IFullOreder";

export default {
  title: "Components/ProductItem",
  component: ProductItem,
};

const product: IProduct = {
  id: 1,
  name: "Product 1",
  description: "This is a description",
  price: 100,
  currency: "USD",
  img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/IPhone_1st_Gen.svg/200px-IPhone_1st_Gen.svg.png",
};

const order: IFullOrder = {
  orderId: 1,
  productId: 1,
  productName: "Product 1",
  productImg:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/IPhone_1st_Gen.svg/200px-IPhone_1st_Gen.svg.png",
  price: 100,
  currency: "USD",
};

export const Default: Story<{ product: IProduct | IFullOrder }> = ({
  product,
}) => <ProductItem product={product} />;
Default.args = {
  product,
};

export const OrderItem: Story<{ product: IProduct | IFullOrder }> = ({
  product,
}) => <ProductItem product={product} isOrderItem />;
OrderItem.args = {
  product: order,
};
