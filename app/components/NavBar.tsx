import { Box, Button, Flex, Link, LinkProps, Spinner } from "@chakra-ui/react";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../lib/graphql/generated/graphql";
import { withUrql } from "../lib/urqlClient";

const NavBarLink: React.FC<LinkProps> = (props) => {
    return (
        <Link
            mr={4}
            color="white"
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
            {...props}
        />
    );

};

const NavBar: React.FC<{}> = () => {
    const [{ data, fetching }] = useMeQuery();
    const [, logout] = useLogoutMutation();
    let items;
    if (fetching)
        items = <Spinner />;
    else if (!data?.me)
        items = (
            <>
                <NavBarLink href="/login">
                    sign in
                </NavBarLink>
                <NavBarLink href="/create-user">
                    sign up
                </NavBarLink>
            </>
        );
    else
        items = (
            <Flex mr={4}>
                <Box mr={3}>{data.me.username}</Box>
                <Button
                    onClick={() => logout({})}
                    variant="link"
                    textDecoration="none"
                    _hover={{ textDecoration: "none" }}
                > logout </Button>
            </Flex>
        );

    return (
        <Flex bg="gray.800" color="white" p={4} alignItems="center">
            <Box>
                <NavBarLink href="/" fontSize="lg" fontWeight="bold">
                    Reddit
                </NavBarLink>
            </Box>
            <Box ml="auto">
                {items}
            </Box>
        </Flex>
    );
};

export default NavBar;