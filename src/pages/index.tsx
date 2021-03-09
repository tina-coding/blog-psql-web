import { Box, Text } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';

import Navbar from '../components/Navbar';
import Post from '../components/Post';
import Wrapper from '../components/Wrapper';
import { usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <>
      <Navbar />
      <Wrapper>
        {data && data.posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </Wrapper>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
