import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: "http://localhost:4000/graphql", // replace with your GraphQL endpoint
    documents: "app/lib/graphql/**/*.graphql",
    generates: {
        "app/lib/graphql/generated/graphql.tsx": {
            plugins: [
                "typescript",
                "typescript-operations",
                "typescript-react-apollo"
            ],
            config: {
                withHooks: true,
                withHOC: false,
                withComponent: false,
            },
        },
    },
};

export default config;

