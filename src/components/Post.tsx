import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { Post as PostType } from '../generated/graphql';

interface IPostProps {
  post: Omit<PostType, 'updatedAt' | '__typename' | 'author' | 'description'>;
}

const Post: React.FC<IPostProps> = ({ post }) => {
  const createdAt = new Date(+post.createdAt);
  return (
    <Box
      as="section"
      bg={'white'}
      paddingTop="12"
      paddingBottom="6"
      my={4}
      boxShadow="lg"
      borderRadius="lg"
    >
      <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ md: '8' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={4}>
          <Text fontSize="xs" fontWeight="normal" color="gray.400">
            {createdAt.toLocaleDateString()}
          </Text>
          <Text fontSize="xs" fontWeight="normal" color="gray.400">
            {post.claps}
          </Text>
        </Box>
        <Heading fontSize='xl'>
          {post.title}
        </Heading>
        <Text fontSize="medium" fontWeight="normal">
          {post.postDescSnippet}
        </Text>
        <Box marginTop={4}>
        <Text fontSize="medium" fontWeight="normal">
          Author Component: {post.authorId}
        </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Post;
