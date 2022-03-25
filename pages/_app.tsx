import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { Container } from '@chakra-ui/react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Container maxW="container.sm">
        <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  );
}

export default MyApp;
