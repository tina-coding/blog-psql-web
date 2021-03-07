import { Box, Flex, Link, Spacer } from '@chakra-ui/layout';
import { Avatar, Button, Menu, MenuButton, MenuGroup, MenuItem, MenuList, Skeleton, Text } from '@chakra-ui/react';
import { useCurrentUserQuery } from '../generated/graphql';
import NextLink from 'next/link';
import React from 'react';

interface IUserNameProps {
  username: string;
}
const UserName: React.FC<IUserNameProps> = ({ username }) => {
  return (
    <Menu>
      <MenuButton as={Button} bg="purple.900">
        <Avatar name={username} bg="rebeccapurple" />
      </MenuButton>
      <MenuList bg="purple.800">
        <MenuItem>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

const UserNameLoading: React.FC = () => {
  return (
    <Skeleton startColor="purple.500" endColor="orange.500" height="20px" />
  );
};

const UserNotLoggedIn: React.FC = () => {
  return (
    <>
      <NextLink href="/login">
        <Link mr={2}>Login</Link>
      </NextLink>
      <NextLink href="/register">
        <Link mr={2}>Register</Link>
      </NextLink>
    </>
  );
};

interface INavbarProps {}

const Navbar: React.FC<INavbarProps> = ({}) => {
  const [{ data, fetching }] = useCurrentUserQuery();

  return (
    <Flex bg="purple.900" color="white" p={6}>
      <Box>Navigation</Box>
      <Spacer />
      <Box>
        <NextLink href="/">
          <Link mr={2}>Home</Link>
        </NextLink>
        {fetching ? (
          <UserNameLoading />
        ) : data?.currentUser ? (
          <UserName username={data.currentUser.username} />
        ) : (
          <UserNotLoggedIn />
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
