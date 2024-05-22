import { Suspense } from "react";
import Post from "./components/Post";
import { getServerApolloClient } from "./lib/client";
import { PostsDocument } from "./lib/graphql/generated/graphql";
import { Box } from "@chakra-ui/react";

export const revalidate = 5;

const Page = async () => {
    const { data } = await getServerApolloClient().query({ query: PostsDocument });
    return (
        <Suspense>
            {data && data.posts.length > 0 ? (
                data.posts.map((p: any) => <Post key={p.id} title={p.title} content={p.content} />)
            ) : (
                <Box width="100vw" height="100vh" bg="gray.200" />
            )}
        </Suspense>
    );
};

export default Page;
