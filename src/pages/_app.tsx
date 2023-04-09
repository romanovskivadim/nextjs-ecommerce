import Layout from "@/components/Layout/Layout";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import store from "@/store/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider resetCSS={true} portalZIndex={4}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  );
}
