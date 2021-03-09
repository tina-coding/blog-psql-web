import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Post as PostType } from "../generated/graphql";

interface IPostProps {
	post: Omit<PostType, "updatedAt">;
}

const Post: React.FC<IPostProps> = ({ post }) => {
	const createdAt = new Date(+post.createdAt);
	return (
		<Box as="section" bg={'white'} py="12" my={4} boxShadow="lg" borderRadius="lg">
      <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ md: '8' }}>
        <Text fontSize="xs" fontWeight="normal" color="gray.400">
          {createdAt.toLocaleDateString()}
        </Text>
        <Text fontSize="lg" fontWeight="bold">
          {post.title}
        </Text>
        <Text fontSize="medium" fontWeight="normal">
          {post.description}
        </Text>
      </Box>
    </Box>
  );
}

export default Post;