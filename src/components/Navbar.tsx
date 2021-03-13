import { Box, Flex, Link, Spacer } from '@chakra-ui/layout';
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  useToast
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useCurrentUserQuery, useLogoutMutation } from '../generated/graphql';

interface IUserNameProps {
  username: string;
}
const UserName: React.FC<IUserNameProps> = ({ username }) => {
  const [, logout] = useLogoutMutation();
  const toast = useToast();
  const router = useRouter();

  const logoutCurrentUser = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const response = await logout();
    response.data?.logout
      ? router.push('/login')
      : toast({
          position: 'top-right',
          title: 'Error Logging Out',
          description: 'There was an issue logging you out.',
          status: 'error',
          duration: 9000,
          isClosable: true
        });
  };
  return (
    <Menu>
      <MenuButton as={Button} bg="purple.900">
        <Avatar name={username} bg="rebeccapurple" />
      </MenuButton>
      <MenuList bg="purple.800">
        <MenuItem onClick={logoutCurrentUser}>
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
    <Flex position='sticky' top={0} zIndex={1} bg="purple.900" color="white" p={6}>
      <Box>Navigation</Box>
      <Spacer />
      <Box>
        <NextLink href="/">
          <Link mr={2}>Home</Link>
        </NextLink>
        <NextLink href="/create-post">
          <Link mr={2}>Create Post</Link>
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
