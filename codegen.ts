import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: "http://localhost:4000/graphql", // Adjust this to your GraphQL endpoint
    documents: "app/lib/graphql/**/*.graphql", // Path to your GraphQL queries and mutations
    generates: {
        "app/lib/graphql/generated/graphql.tsx": {
            plugins: [
                "typescript",
                "typescript-operations",
                "typescript-urql"
            ],
            config: {
                withHOC: false,
                withComponent: false,
                withHooks: true
            }
        }
    }
};

export default config;
