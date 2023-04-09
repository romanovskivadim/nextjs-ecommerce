import { Box, Container, Heading } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { getOrders } from "../utils/api";
import Product from "@/components/Products/Product";
import { IFullOrder } from "@/types/IFullOreder";
import localStoreHelper from "@/utils/localStoreHelper";
import { IUser } from "@/types/IUser";
import { LOCAL_STORAGE_KEYS, PAGE_ROUTES } from "@/utils/constanats";
import { useRouter } from "next/router";

const Orders = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<IFullOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const localStoreUser = localStoreHelper.getLocalStorageItem<IUser>(LOCAL_STORAGE_KEYS.user);
    
    if(localStoreUser) {
      const fetchOrders = async () => {
        try {
          const orders = await getOrders(localStoreUser);
          setOrders(orders);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
        }
      };

      fetchOrders();
    } else {
      router.push(PAGE_ROUTES.login);
    }

  }, []);

  return (
    <Box>
      <Head>
        <title>Products - Your Store</title>
      </Head>
      <Container maxW="container.xl">
        <Heading as="h1" size="lg" mb={4}>
          Your Orders
        </Heading>
        {isLoading ? (
          <p>Loading...</p>
        ) : orders.length === 0 ? (
          <p>You have no orders yet.</p>
        ) : (
          <Product products={orders} isOrderItem />
        )}
      </Container>
    </Box>
  );
};

export default Orders;
