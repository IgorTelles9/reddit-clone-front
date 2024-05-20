"use client";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import NavBar from "./components/NavBar";
import { inter } from "./fonts";
import "./globals.css";
import { createUrqlClient, withUrql } from "./lib/urqlClient";
import { Provider } from "urql";

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
                <Provider value={createUrqlClient()}>
                    <ChakraProvider>
                        <NavBar />
                        {children}
                    </ChakraProvider>
                </Provider>
            </body>
        </html>
    );
}