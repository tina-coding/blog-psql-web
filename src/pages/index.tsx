import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { useState } from 'react';

import Navbar from '../components/Navbar';
import Post from '../components/Post';
import Wrapper from '../components/Wrapper';
import { usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const Index = () => {
  const [variables, setVariables] = useState({ options: { limit: 5, cursor: null as string | null } });
  const [{ data, fetching }] = usePostsQuery({ variables });
  return (
    <>
      <Navbar />
      <Wrapper>
        {data && data.posts.posts.map((post) => <Post key={post.id} post={post} />)}
        {data && (
          <Flex>
            <Button isLoading={fetching} m="auto" my={8} bg="gray.300">
              Load More
            </Button>
          </Flex>
        )}
      </Wrapper>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
