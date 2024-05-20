"use client";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import NavBar from "./components/NavBar";
import { inter } from "./fonts";
import "./globals.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

// For client side rendering
const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
    credentials: "include",

});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <Head>
                <title>Reddit Clone</title>
                <meta name="description" content="Reddit Clone App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body className={inter.className}>
                <ApolloProvider client={client}>
                    <ChakraProvider>
                        <NavBar />
                        {children}
                    </ChakraProvider>
                </ApolloProvider>
            </body>
        </html>

    );
}