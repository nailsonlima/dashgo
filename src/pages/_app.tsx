import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/styles/theme";


import { SidebarDrawerProvider } from "@/contexts/SidebarDrawerContent";
import { makeServer } from "@/services/mirage";
import Head from "next/head";
import {  QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from "@/services/queryClient";
import { AuthProvider } from "@/contexts/AuthContext";

if (process.env.NODE_ENV === 'development') {
  console.log('MirageJS inicializado🤡🤡🤡')
  makeServer();
}

export default function App({ Component, pageProps }: AppProps) {



  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ChakraProvider theme={theme}>
          <Head>
            <title>dashgo</title>
          </Head>
          <SidebarDrawerProvider>
            <Component {...pageProps} />
          </SidebarDrawerProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </AuthProvider>
  )
}
 