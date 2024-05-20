"use client";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import { Provider } from "urql";
import NavBar from "./components/NavBar";
import { inter } from "./fonts";
import "./globals.css";
import { createUrqlClient } from "./lib/urqlClient";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Provider value={createUrqlClient()}>
            <html lang="en">
                <Head>
                    <title>Reddit Clone</title>
                    <meta name="description" content="Reddit Clone App" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <body className={inter.className}>
                    <ChakraProvider>
                        <NavBar />
                        {children}
                    </ChakraProvider>
                </body>
            </html>
        </Provider>

    );
}