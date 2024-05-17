import { Box, Button, Flex, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'urql';
import { Spinner } from '@chakra-ui/react'
import { useLogoutMutation, useMeQuery } from '../graphql/generated/graphql';

const NavBar: React.FC = () => {
    const [{ data, fetching }] = useMeQuery();
    const [, logout] = useLogoutMutation();
    let items;
    if (fetching)
        items = <Spinner />;
    else if (!data?.me)
        items = (
            <>
                <Link mr={4} color="white" href="/login">
                    sign in
                </Link>
                <Link mr={4} color="white" href="/create-user">
                    sign up
                </Link>
            </>
        )
    else
        items = (
            <Flex mr={4}>
                <Box mr={3}>{data.me.username}</Box>
                <Button onClick={() => logout({})} variant="link" > logout </Button>
            </Flex>
        )

    return (
        <Flex bg="gray.800" color="white" p={4} alignItems="center">
            <Box>
                <Text fontSize="lg" fontWeight="bold">
                    Reddit
                </Text>
            </Box>
            <Box ml="auto">
                {items}
            </Box>
        </Flex>
    );
};

export default NavBar;