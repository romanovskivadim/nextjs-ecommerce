import { Box, Container } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import { getProducts } from "../utils/api";
import Product from "@/components/Products/Product";
import { IProduct } from "@/types/IProduct";

interface Props {
  products: IProduct[];
}

const Products: React.FC<Props> = ({ products }) => {
  return (
    <Box>
      <Head>
        <title>Products - Your Store</title>
      </Head>
      <Container maxW="container.xl">
        <Product products={products} />
      </Container>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const products = await getProducts();
  return {
    props: {
      products,
    },
  };
};

export default Products;
