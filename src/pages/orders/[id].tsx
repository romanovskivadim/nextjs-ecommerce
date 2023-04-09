import { useState } from 'react';
import {
  Box,
  Center,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getProduct } from '@/utils/api';
import numberHelper from '@/utils/numberHelper';
import { useRouter } from 'next/router';
import { IProduct } from '@/types/IProduct';

interface Props {
  order: IProduct | null;
}

const OrderPage = ({ order }: Props) => {
  const [isLoading] = useState<boolean>(!order);
  const router = useRouter();

  if (isLoading) {
    return (
      <Center height="100vh">
        <Text>Loading...</Text>
      </Center>
    );
  }

  return (
    <Box m={10}>
      <Stack direction={['column', 'row']}>
        <Box flex={1}>
          <Image src={order?.img} alt={order?.name} />
        </Box>
        <Box flex={1} ml={[0, 10]}>
          <Heading>{order?.name}</Heading>
          <Divider my={4} />
          <Text fontSize="lg" color="Highlight">Was ordered</Text>
          <Divider my={4} />
          <Stack direction={['column', 'row']} justify="space-between">
            <Box>
              <Text fontSize="2xl" fontWeight="bold" color="gray.600">
                {numberHelper.formatCurrency(order?.price || 0, order?.currency)}
              </Text>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const productId = params?.id;
  
  const order = await getProduct(productId as string);

  return {
    props: {
      order,
    },
  };
};

export default OrderPage;
