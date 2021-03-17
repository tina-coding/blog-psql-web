import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
// Graphql
import {
  Post as PostType,
  useCurrentUserQuery,
  User
} from '../generated/graphql';
import PostDate from './common/PostDate';
// Components
import ClapButton from './Post/ClapButton';
import DeleteButton from './Post/DeleteButton';
import EditButton from './Post/EditButton';




type PostAuthorType = Pick<User, 'id' | 'username'>;
interface IPostProps {
  post: Omit<
    PostType,
    'updatedAt' | '__typename' | 'description' | 'author'
  > & { author: PostAuthorType };
}

const Post: React.FC<IPostProps> = ({ post }) => {
  const createdAt = new Date(+post.createdAt);

  const [{ data, fetching }] = useCurrentUserQuery({
    pause: typeof window === 'undefined'
  });

  const renderDeleteBtn = data && data.currentUser?.id === post.authorId;
  const renderClapBtn = data && data.currentUser?.id !== post.authorId;
  return (
    <Box
      as="section"
      maxW="container.lg"
      paddingTop="2"
      paddingBottom="6"
      my={5}
      boxShadow="lg"
      borderRadius="lg"
    >
      <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ md: '8' }}>
        <Flex>
          <Box flex={1}>
            <PostDate isoDate={post.createdAt} label='created at' variant='sm' />
            <NextLink href="/post/[id]" as={`/post/${post.id}`}>
              <Link>
                <Heading fontSize="xl" mt={6}>{post.title}</Heading>
              </Link>
            </NextLink>
            <Flex justifyContent="center" alignItems="center">
              <Text flex={1} fontSize="medium" fontWeight="normal">
              {post.postDescSnippet}
              </Text>
              {renderDeleteBtn ? (
                <>
                  <EditButton id={post.id} />
                  <DeleteButton id={post.id} />
                </>
              ) : null}

              {renderClapBtn ? (
                <ClapButton
                  votes={post.votes}
                  id={post.id}
                  hasVoted={post.hasVoted}
                  isDisabled={!data?.currentUser}
                />
              ) : null}
            </Flex>


            <Box marginTop={4}>
              <Text fontSize="medium" fontWeight="normal">
                Author Component: {post.author.username}
              </Text>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Post;
