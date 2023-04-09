import { logout } from "@/utils/api";
import { PAGE_ROUTES } from "@/utils/constanats";
import { Box, Flex, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const HeaderComponent = () => {
  const router = useRouter();

  const handleNavigate = (route: string) => {
    router.push(route);
  };

  const handleLogout = async () => {
    try {
      await logout();

      router.push(PAGE_ROUTES.login);
    } catch (error) {
      console.error(error);
    }
  };

  const menuItemsList = Object.entries(PAGE_ROUTES.menu);

  const isActivePage = (currentPage: string) => {
    return currentPage === router.pathname ? "blackAlpha" : "gray.500";
  };

  return (
    <Box bg="gray.500" p={4}>
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          {menuItemsList.map((item) => (
            <Button
              bgColor={isActivePage(item?.[1])}
              size="sm"
              colorScheme={isActivePage(item?.[1])}
              onClick={() => handleNavigate(item?.[1])}
              mr={4}
              key={item?.[1]}
            >
              {item?.[0]}
            </Button>
          ))}
        </Box>
        <Box>
          <Button size="sm" colorScheme="red" onClick={handleLogout}>
            logout
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default HeaderComponent;
