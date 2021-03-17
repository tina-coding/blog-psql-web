import {Link, IconButton } from '@chakra-ui/react';
import NextLink from 'next/link';
import { GoPencil } from 'react-icons/go';
import { Post, useDeletePostMutation } from '../../generated/graphql';

type EditButtonProps = Pick<Post, 'id'>;

const EditButton: React.FC<EditButtonProps> = ({ id }) => {
  const [, deletePostById] = useDeletePostMutation();

  /**
   * onClick
   * invokes deletePostById mutation
   * @param e React.MouseEvent: event handler for onClick
   */
  const onClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // delete that post
    const result = await deletePostById({ id });
  };

	return (
    <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton
				as={Link}
          icon={<GoPencil />}
          aria-label="Pencil Emoji, Click to edit your post"
          fontSize="sm"
          bg="whatsapp.300"
          color="whatsapp.600"
          mr={2}
        />
    </NextLink>
  );
};

export default EditButton;
