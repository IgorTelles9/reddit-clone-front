"use client";
import { Box } from "@chakra-ui/react";
import Post from "./components/Post";
import { usePostsQuery } from "./lib/graphql/generated/graphql";
import { withUrql } from "./lib/urqlClient";

const Page = () => {
    const [{ data }] = usePostsQuery();
    return (
        <Box mt={4}>
            {
                data
                    ? (data.posts.map(({ id, title, content }) => (
                        <Post key={id} title={title} content={content} />
                    )))
                    : null
            }
        </Box>
    );
};

export default withUrql(Page);
