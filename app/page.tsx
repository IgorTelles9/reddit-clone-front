"use client";
import { withUrql } from "./lib/urqlClient";

const Page = () => {
    return (
        <>
            Hello World!
        </>

    );
};

export default withUrql(Page);
