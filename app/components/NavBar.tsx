import { Box, Flex, Link, LinkProps } from "@chakra-ui/react";
import React from "react";
import { useMeQuery } from "../lib/graphql/generated/graphql";
import ProfileMenu from "./ProfileMenu";

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

const NavBar: React.FC = () => {
    const { data, loading } = useMeQuery();
    let items;

    if (loading) items = null;
    else if (!data?.me)
        items = (
            <>
                <NavBarLink href="/login">sign in</NavBarLink>
                <NavBarLink href="/create-user">sign up</NavBarLink>
            </>
        );
    else
        items = (
            <Flex justifyContent="center" mr={4}>
                <ProfileMenu username={data.me.username} email={data.me.email} />
            </Flex>
        );

    return (
        <Flex bg="#3f207d" color="white" p={4} alignItems="center">
            <Box>
                <NavBarLink href="/" fontSize="lg" fontWeight="bold">
                    Reddit
                </NavBarLink>
            </Box>
            <Box ml="auto">{items}</Box>
        </Flex>
    );
};

export default NavBar;
