"use client";
import { Suspense } from "react";
import Post from "./components/Post";
import { Post as PostType, PostsDocument } from "./lib/graphql/generated/graphql";
import { useQuery } from "@urql/next";

const Page = () => {
    const [{ data }] = useQuery({ query: PostsDocument });
    return (
        <Suspense>
            <h1>Posts</h1>
            {
                data
                    ? (data.posts.map((p: PostType) => (
                        <Post key={p.id} title={p.title} content={p.content} />
                    )))
                    : null
            }
        </Suspense>

    );
};

export default Page;
