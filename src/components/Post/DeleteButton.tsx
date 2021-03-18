import { IconButton } from '@chakra-ui/react';
import { GoTrashcan } from 'react-icons/go';
import { Post, useDeletePostMutation } from "../../generated/graphql";

type DeleteButtonProps = Pick<Post, 'id'>;

const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
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
    <IconButton
      onClick={onClick}
      icon={<GoTrashcan />}
      aria-label="Okay Hand Emoji, Click to upvote a post"
      fontSize="sm"
      bg="red"
      color="red.200"
      mr={2}
    />
  );
};

export default DeleteButton;