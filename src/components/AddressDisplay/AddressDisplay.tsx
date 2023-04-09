import { IAddress } from "@/types/IAddress";
import { GoogleMapsAdapter, UserService } from "@/utils/UserService";
import { Box, Divider, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const AddressDisplay = () => {
  const [address, setAddress] = useState<IAddress | null>(null);

  const getUserAddress = async () => {
    try {
      const userService = new UserService(
        new GoogleMapsAdapter(),
        new GoogleMapsAdapter()
      );
      const address = await userService.getUserLocationAddress();

      setAddress(address);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserAddress();
  }, []);

  return address ? (
    <Box mb={6} mt={6}>
      <Heading as="h2" size="md">
        Your address:
      </Heading>
      <Text>Street: {address?.street}</Text>
      <Text>City: {address?.city}</Text>
      <Text>Country: {address?.country}</Text>
      <Text>PostalCode: {address?.postalCode}</Text>
      <Divider mt={6} />
    </Box>
  ) : null;
};

export default AddressDisplay;
