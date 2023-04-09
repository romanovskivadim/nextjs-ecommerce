import { signup } from "@/utils/api";
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

const Signup = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        await signup(values);

        router.push(PAGE_ROUTES.login);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Box>
      <Container maxW={"7xl"} py={{ base: 10, sm: 20, lg: 32 }}>
        <Heading as="h1" mb={6}>
          Sign up
        </Heading>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={4}>
            <Input
              name="firstName"
              placeholder="First name"
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
            <Input
              name="lastName"
              placeholder="Last name"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
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
            <Button type="submit">Sign up</Button>
          </Stack>
        </form>
      </Container>
    </Box>
  );
};

export default Signup;
