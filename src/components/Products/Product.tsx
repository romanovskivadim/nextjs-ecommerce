import React from "react";
import { Box, Grid } from "@chakra-ui/react";
import ProductItem from "./ProductItem";
import { IProduct } from "@/types/IProduct";
import { IFullOrder } from "@/types/IFullOreder";

interface Props {
  products: IProduct[] | IFullOrder[];
  isOrderItem?: boolean;
}

const Product: React.FC<Props> = ({ products, isOrderItem }) => {
  return (
    <Box p={4}>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {products.map((product) => (
          <ProductItem key={(product as IProduct)?.id || (product as IFullOrder)?.orderId} product={product} isOrderItem={isOrderItem} />
        ))}
      </Grid>
    </Box>
  );
};

export default Product;
