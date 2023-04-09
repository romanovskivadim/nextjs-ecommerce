import Layout from '@/components/Layout/Layout';
import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS={true} portalZIndex={4}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
