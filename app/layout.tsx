"use client";
import "./globals.css";
import { inter } from "./fonts";
import NavBar from "./components/NavBar";
import { Provider } from "urql";
import { ChakraProvider } from "@chakra-ui/react";
import { createUrqlClient } from "./lib/urqlClient";
import Head from "./head";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Provider value={createUrqlClient()}>
            <html lang="en">
                <Head />
                <body className={inter.className}>
                    <ChakraProvider>
                        <NavBar />
                        <main>
                            {children}
                        </main>
                    </ChakraProvider>
                </body>
            </html>
        </Provider>

    );
}
