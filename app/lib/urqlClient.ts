import { Client, fetchExchange } from "urql";
import { cache } from "./cache";
import { withUrqlClient } from "next-urql";

function getUrqlClient(ssrExchange: any = null) {
    const exchanges = [cache, fetchExchange];
    if (ssrExchange)
        exchanges.push(ssrExchange);
    return {
        url: process.env.SERVER || "http://localhost:4000/graphql",
        exchanges,
        fetchOptions: {
            credentials: "include" as RequestCredentials
        }
    };
}

export function createUrqlClient() {
    return new Client(getUrqlClient());
}

export const withUrql = (PageComponent: any, options = {}) =>
    withUrqlClient((ssrExchange) => getUrqlClient(ssrExchange), {
        ...options,
        ssr: true,
    })(PageComponent);

