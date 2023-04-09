import { Box, Container } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "@/components/Products/Product";
import { IProduct } from "@/types/IProduct";
import { RootState } from "@/store";
import { fetchProducts } from "@/store/reducers/products";

interface Props {
  products: IProduct[];
}

const Products: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const productsState = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Box>
      <Head>
        <title>Products - Your Store</title>
      </Head>
      <Container maxW="container.xl">
        <Product products={productsState.products} />
      </Container>
    </Box>
  );
};

export default Products;
