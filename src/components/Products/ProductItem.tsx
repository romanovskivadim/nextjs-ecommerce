import React from "react";
import { Box, Text, Image, Button } from "@chakra-ui/react";
import { IProduct } from "@/types/IProduct";
import numberHelper from "@/utils/numberHelper";
import { useRouter } from "next/router";
import { LOCAL_STORAGE_KEYS, PAGE_ROUTES } from "@/utils/constanats";
import Link from "next/link";
import localStoreHelper from "@/utils/localStoreHelper";
import { IFullOrder } from "@/types/IFullOreder";

interface Props {
  product: IProduct | IFullOrder;
  isOrderItem?: boolean;
}

const ProductItem: React.FC<Props> = ({ product, isOrderItem }) => {
  const router = useRouter();

  const handleMakeOrder = (
    event: React.MouseEvent<HTMLButtonElement>,
    product: IProduct
  ) => {
    event.preventDefault();
    localStoreHelper.setLocalStorageItem(LOCAL_STORAGE_KEYS.cart, [product]);
    router.push(PAGE_ROUTES.menu.cart);
  };

  const linkToEntity = (product as IProduct)?.id
    ? `${PAGE_ROUTES.menu.products}/${(product as IProduct).id}`
    : `${PAGE_ROUTES.menu.orders}/${(product as IFullOrder)?.productId}`;

  return (
    <Link href={linkToEntity}>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Box p="6">
          <Image
            src={
              (product as IProduct).img || (product as IFullOrder)?.productImg
            }
            alt={
              (product as IProduct)?.name ||
              (product as IFullOrder)?.productName
            }
            boxSize="15em"
            objectFit="contain"
          />
        </Box>
        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Text fontSize="xl" fontWeight="semibold" mr="2">
              {(product as IProduct)?.name ||
                (product as IFullOrder)?.productName}
            </Text>
            <Text color="gray.500">
              {numberHelper.formatCurrency(product.price, product.currency)}
            </Text>
          </Box>

          {(product as IProduct)?.description && (
            <Text mt="2" color="gray.600">
              {(product as IProduct)?.description}
            </Text>
          )}

          <Box mt="2" display="flex" alignItems="center">
            {!isOrderItem && (
              <Button
                onClick={(e) => handleMakeOrder(e, product as IProduct)}
                colorScheme="teal"
                variant="outline"
              >
                Buy
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default ProductItem;
