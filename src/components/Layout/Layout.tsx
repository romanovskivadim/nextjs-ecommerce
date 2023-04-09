import React, { ReactNode } from "react";
import { Box, Container } from "@chakra-ui/react";
import { ToastProvider } from "react-toast-notifications";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
// import { useAuth } from '@/contexts/AuthContext'

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  // const { isAuth } = useAuth();
  return (
    <ToastProvider>
      <Box bg="gray.80" minHeight="100vh">
        <HeaderComponent />
        {/* {isAuth} */}
        <Container maxW="container.lg" p={4}>
          {children}
        </Container>
      </Box>
    </ToastProvider>
  );
};

export default Layout;
