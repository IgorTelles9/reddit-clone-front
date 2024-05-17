"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { Client, Provider, fetchExchange } from 'urql';
import { cache } from "./cache";



const client = new Client({
    url: 'http://localhost:4000/graphql',
    exchanges: [cache, fetchExchange],
    fetchOptions: {
        credentials: 'include'

    }
});

export default function Providers({ children }: { children: React.ReactNode }) {
    return <Provider value={client} ><ChakraProvider>{children}</ChakraProvider></Provider>;
}