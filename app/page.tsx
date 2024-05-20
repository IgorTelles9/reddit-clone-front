"use client";
import { Suspense } from "react";
import Post from "./components/Post";
import { Post as PostType, PostsDocument, usePostsQuery } from "./lib/graphql/generated/graphql";

const Page = () => {
    const [{ data }] = usePostsQuery();
    return (
        <Suspense>
            <h1>Posts</h1>
            {
                data
                    ? (data.posts.map(({ id, title, content }) => (
                        <Post key={id} title={title} content={content} />
                    )))
                    : null
            }
        </Suspense>

    );
};

export default Page;
