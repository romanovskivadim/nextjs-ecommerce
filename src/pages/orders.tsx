import { Box, Container, Heading } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect } from "react";
import localStoreHelper from "@/utils/localStoreHelper";
import { IUser } from "@/types/IUser";
import { LOCAL_STORAGE_KEYS, PAGE_ROUTES } from "@/utils/constanats";
import { useRouter } from "next/router";
import OrdersEventStream from "@/utils/ordersSse";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { fetchOrders } from "@/store/reducers/orders";
import { setOrders } from "@/store/reducers/orders";
import Product from "@/components/Products/Product";

const Orders = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const ordersState = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    const localStoreUser = localStoreHelper.getLocalStorageItem<IUser>(
      LOCAL_STORAGE_KEYS.user
    );

    const ordersEventStream = new OrdersEventStream();

    if (localStoreUser) {
      dispatch(fetchOrders());

      ordersEventStream.connect();
      ordersEventStream.subscribe((order) => {
        dispatch(setOrders(order));
      });
    } else {
      router.push(PAGE_ROUTES.login);
    }

    return () => {
      ordersEventStream.unsubscribe();
      ordersEventStream.disconnect();
    };
  }, [dispatch]);

  return (
    <Box>
      <Head>
        <title>Products - Your Store</title>
      </Head>
      <Container maxW="container.xl">
        <Heading as="h1" size="lg" mb={4}>
          Your Orders
        </Heading>
        {ordersState.isLoading ? (
          <p>Loading...</p>
        ) : ordersState.orders.length === 0 ? (
          <p>You have no orders yet.</p>
        ) : (
          <Product products={ordersState.orders} isOrderItem />
        )}
      </Container>
    </Box>
  );
};

export default Orders;
