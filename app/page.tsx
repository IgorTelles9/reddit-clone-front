import { Suspense } from "react";
import Post from "./components/Post";
import { getServerApolloClient } from "./lib/client";
import { PostsDocument } from "./lib/graphql/generated/graphql";

export const revalidate = 5;

const Page = async () => {
    const { data } = await getServerApolloClient().query({ query: PostsDocument });
    return (
        <Suspense>
            <h1>Posts</h1>
            {
                data
                    ? (data.posts.map((p: any) => (
                        <Post key={p.id} title={p.title} content={p.content} />
                    )))
                    : null
            }
        </Suspense>

    );
};

export default Page;
