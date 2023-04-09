import { LOCAL_STORAGE_KEYS, PAGE_ROUTES } from "@/utils/constanats";
import localStoreHelper from "@/utils/localStoreHelper";
import numberHelper from "@/utils/numberHelper";
import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Heading,
  Image,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useGetCartItems } from "../../../hooks/useGetCartItems";
import { createOrder } from "@/utils/api";
import { useState } from "react";

const NewOrder = () => {
  const router = useRouter();
  const [cartProducts, setCartItems] = useGetCartItems();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClearCart = () => {
    localStoreHelper.removeLocalStorageItem(LOCAL_STORAGE_KEYS.cart);
    setCartItems([]);
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      await createOrder({ productId: cartProducts?.[0]?.id });

      localStoreHelper.removeLocalStorageItem(LOCAL_STORAGE_KEYS.cart);

      router.push(`${PAGE_ROUTES.menu.orders}/${cartProducts?.[0]?.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Center height="100vh">
        <Text>Loading...</Text>
      </Center>
    );
  }

  return (
    <Box m={10}>
      <Container maxW="container.xl">
        <Heading as="h1" size="lg" mb={4}>
          Your Cart
        </Heading>
        {cartProducts.length === 0 ? (
          <Text>Your cart is empty.</Text>
        ) : (
          <>
            <List spacing={3} mb={4}>
              {cartProducts.map((item) => (
                <>
                  <Divider />
                  <ListItem key={item.id} display="flex" alignItems="center">
                    <Image
                      src={item.img}
                      alt={item.name}
                      boxSize="8em"
                      objectFit="contain"
                      mr={4}
                    />
                    <Box>
                      <Text>{item.name}</Text>
                      <Text>
                        {numberHelper.formatCurrency(item.price, item.currency)}
                      </Text>
                    </Box>
                  </ListItem>
                </>
              ))}
              <Divider />
            </List>
            <Button colorScheme="red" onClick={handleClearCart}>
              Clear Cart
            </Button>
            <Button ml={4} onClick={handleCheckout}>
              Make order and checkout
            </Button>
          </>
        )}
      </Container>
    </Box>
  );
};

export default NewOrder;
