"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { UrqlProvider, cacheExchange, createClient, fetchExchange, ssrExchange } from "@urql/next";
import Head from "next/head";
import { useMemo } from "react";
import NavBar from "./components/NavBar";
import { inter } from "./fonts";
import "./globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [client, ssr] = useMemo(() => {
        const ssr = ssrExchange({
            isClient: typeof window !== "undefined"
        });
        // const client = createUrqlClient();
        const client = createClient({
            url: "http://localhost:4000/graphql",
            exchanges: [cacheExchange, ssr, fetchExchange],
            suspense: true,
        });
        return [client, ssr];
    }, []);
    return (
        <UrqlProvider client={client} ssr={ssr}>
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
        </UrqlProvider>

    );
}