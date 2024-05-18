import { cacheExchange, Cache } from "@urql/exchange-graphcache";
import { MeDocument } from "./graphql/generated/graphql";

const updateMeQuery = (cache: Cache, result: any) => {
    cache.updateQuery({ query: MeDocument }, data => {
        if (data && result.login) {
            data.me = result.login.user;
            return data;
        }
        return null;
    });
};

const clearMeQuery = (cache: Cache) => updateMeQuery(cache, { login: { user: null } });



export const cache = cacheExchange({
    resolvers: {
    },
    updates: {
        Mutation: {
            login: (result, args, cache, info) => updateMeQuery(cache, result),
            createUser: (result, args, cache, info) => updateMeQuery(cache, result),
            logout: (result, args, cache, info) => clearMeQuery(cache)
        }
    }
});