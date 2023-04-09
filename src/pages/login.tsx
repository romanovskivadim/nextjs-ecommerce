import { login } from "@/utils/api";
import { PAGE_ROUTES } from "@/utils/constanats";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        await login(values);

        router.push(PAGE_ROUTES.menu.products);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Box>
      <Container maxW={"7xl"} py={{ base: 10, sm: 20, lg: 32 }}>
        <Heading as="h1" mb={6}>
          Login
        </Heading>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={4}>
            <Input
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <Input
              name="password"
              placeholder="Password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <Button type="submit">Log in</Button>
          </Stack>
        </form>
      </Container>
    </Box>
  );
};

export default Login;
