import { Link } from '@chakra-ui/react';
import { Skeleton } from '@chakra-ui/skeleton';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import PostDetailWrapper, {
  PostDetailMetadata
} from '../../components/PostDetail/PostDetailWrapper';
import { usePostFromQueryParams } from '../../hooks/usePostFromQueryParam';
import Layout from '../../layouts/Layout';
import { createUrqlClient } from '../../utils/createUrqlClient';

interface IPostDetailProps {}

const PostDetail: React.FC<IPostDetailProps> = ({}) => {
  const{post: [{ data, fetching }]} = usePostFromQueryParams();
  return (
    <Layout variant="large">
      <NextLink href="/">
        <Link>Back</Link>
      </NextLink>
      <PostDetailWrapper>
        <Skeleton isLoaded={!fetching}>
          {data?.post && (
            <>
              <PostDetailMetadata
                createdAt={data.post.createdAt}
                updatedAt={data.post.updatedAt}
                votes={data.post.votes}
              />
              <PostDetailWrapper.Title
                authorUsername={data.post.author.username}
              >
                {data?.post?.title}
              </PostDetailWrapper.Title>
            </>
          )}

          <PostDetailWrapper.Body>
            {data?.post?.description}
          </PostDetailWrapper.Body>
        </Skeleton>
      </PostDetailWrapper>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(PostDetail);
