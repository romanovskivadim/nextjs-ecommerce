import { useState } from "react";
import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { IProduct } from "@/types/IProduct";
import { GetServerSideProps } from "next";
import { getProduct } from "@/utils/api";
import numberHelper from "@/utils/numberHelper";
import { useGetCartItems } from "../../../hooks/useGetCartItems";
import { isProductInCart } from "@/utils/isProductInCart";
import { useRouter } from "next/router";
import Link from "next/link";
import { LOCAL_STORAGE_KEYS, PAGE_ROUTES } from "@/utils/constanats";
import localStoreHelper from "@/utils/localStoreHelper";

interface Props {
  product: IProduct | null;
}

const ProductPage = ({ product }: Props) => {
  const [isLoading] = useState<boolean>(!product);
  const [cartProducts] = useGetCartItems();
  const router = useRouter();
  const { id } = router.query;

  if (isLoading) {
    return (
      <Center height="100vh">
        <Text>Loading...</Text>
      </Center>
    );
  }

  const handleAddToCart = () => {
    localStoreHelper.setLocalStorageItem(LOCAL_STORAGE_KEYS.cart, [product]);
    router.push(PAGE_ROUTES.menu.cart);
  };

  return (
    <Box m={10}>
      <Stack direction={["column", "row"]}>
        <Box flex={1}>
          <Image src={product?.img} alt={product?.name} />
        </Box>
        <Box flex={1} ml={[0, 10]}>
          <Heading>{product?.name}</Heading>
          <Divider my={4} />
          <Text fontSize="lg">{product?.description}</Text>
          <Divider my={4} />
          <Stack direction={["column", "row"]} justify="space-between">
            <Box>
              <Text fontSize="2xl" fontWeight="bold" color="gray.600">
                {numberHelper.formatCurrency(
                  product?.price || 0,
                  product?.currency
                )}
              </Text>
            </Box>
            <Box>
              {isProductInCart(cartProducts, id as string) ? (
                <Text fontSize="lg">
                  Already in your{" "}
                  <Link
                    style={{ textDecoration: "underline" }}
                    href={PAGE_ROUTES.menu.cart}
                  >
                    cart
                  </Link>
                </Text>
              ) : (
                <Button onClick={handleAddToCart}>Buy</Button>
              )}
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const productId = params?.id;

  const product = await getProduct(productId as string);

  return {
    props: {
      product,
    },
  };
};

export default ProductPage;
