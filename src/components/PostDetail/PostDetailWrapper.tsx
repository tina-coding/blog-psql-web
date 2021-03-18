import { Box, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { Post } from '../../generated/graphql';
import { formatDate } from '../../utils/formatDate';
import { IoIosClock } from 'react-icons/io';
import { TiThumbsOk } from 'react-icons/ti';
import { BsClockHistory } from 'react-icons/bs';

type IPostDetailMetaProps = Pick<Post, 'createdAt' | 'updatedAt' | 'votes'>;
export const PostDetailMetadata: React.FC<IPostDetailMetaProps> = ({
  createdAt,
  updatedAt,
  votes
}) => (
  <Box>
    <Flex flexDirection="row">
      <Flex alignItems="center" mr={3}>
        <Icon as={BsClockHistory} mr={2} color="purple.800" />
        <Text color="gray.500" pr={1}>
          updated at •
        </Text>
        <Text pl={1} color="purple.800" fontWeight="semibold">
          {formatDate(updatedAt).replaceAll('/', '.')}
        </Text>
      </Flex>
      <Flex alignItems="center" ml={3} mr={3}>
        <Icon as={IoIosClock} mr={2} color="purple.800" />
        <Text color="gray.500" pr={1}>
          created at •
        </Text>
        <Text pl={1} color="purple.800" fontWeight="semibold">
          {formatDate(createdAt).replaceAll('/', '.')}
        </Text>
      </Flex>
      <Flex alignItems="center" ml={3}>
        <Icon as={TiThumbsOk} color="purple.800" />
        <Text>{votes}</Text>
      </Flex>
    </Flex>
  </Box>
);

interface IPostDetailTitleProps {
  authorUsername: string;
}
const PostDetailTitle: React.FC<IPostDetailTitleProps> = ({
  children,
  authorUsername
}) => (
  <>
    <Heading color="whatsapp.300" mb={4} mt={1}>
      {children}
    </Heading>
    <Box py={1} px={6} bg="whatsapp.300" rounded="full" maxWidth="max-content">
      <Text color="whatsapp.700" fontWeight="semibold">
        {authorUsername}
      </Text>
    </Box>
  </>
);

const PostDetailBody: React.FC = ({ children }) => (
  <Text lineHeight="taller" letterSpacing="wide" mt={10}>
    {children}
  </Text>
);

interface IPostDetailWrapperComposition {
  Title: React.FC<IPostDetailTitleProps>;
  Body: React.FC;
}
const PostDetailWrapper: React.FC & IPostDetailWrapperComposition = ({
  children
}) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      width={'container.md'}
      mx="auto"
      my={12}
    >
      <Box py={4}>{children}</Box>
    </Flex>
  );
};

PostDetailWrapper.Title = PostDetailTitle;
PostDetailWrapper.Body = PostDetailBody;

export default PostDetailWrapper;
