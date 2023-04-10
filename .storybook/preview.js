import { ChakraProvider } from "@chakra-ui/react";
import { addDecorator } from "@storybook/react";
import { withChakra } from "../src/utils/withChakra";

addDecorator((storyFn) => <ChakraProvider>{storyFn()}</ChakraProvider>);
addDecorator(withChakra);
