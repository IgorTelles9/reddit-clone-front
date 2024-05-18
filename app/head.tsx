import React from "react";
interface HeadProps {

}

export default function Head(props: HeadProps) {
    return (
        <>
            <title>Reddit Clone</title>
            <meta name="description" content="Reddit Clone App" />
            <link rel="icon" href="/favicon.ico" />
        </>
    );
}
