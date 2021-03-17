import { IconButton, Text } from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { TiThumbsOk } from 'react-icons/ti';
import { Post, useVoteOnPostMutation } from "../../generated/graphql";

type ClapButtonProps = Pick<Post, 'votes' | 'id' | 'hasVoted'> & { isDisabled?: boolean };

// 0 -> not clicked, or "down vote"
// 1 -> clicked, or "up vote"
const ClapButton: React.FC<ClapButtonProps> = ({ votes, id: postId, hasVoted, isDisabled = false }) => {
  const OK_CLICKED_INITIAL = hasVoted === 1;
  const [okClicked, setOkClicked] = useState(OK_CLICKED_INITIAL);
	const [, voteOnPost] = useVoteOnPostMutation();

	/**
	 * submitVote invokes the voteOnPost mutation with the
	 * options including postId and value
	 * @param value number: the vote amount, 1 = upvote, -1 = downvote
	 */
  const submitVote = async (value: number) => {
    const results = await voteOnPost({
      options: {
        postId,
        value
      }
    });
  };

  const toggleOkClicked = () => setOkClicked(prev => !prev);

	/**
	 * onClickIconButton declares the value to be 1 if the
	 * button was clicked on and -1 if the button was clicked
	 * off
	 * toggles the click state okClicked state variable
	 * @param e React.MouseEvent: event handler for onClick
	 */
  const onClickIconButton = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const value = okClicked ? 0 : 1; // click has not toggled, if it's already clicked value = 0 if not value = 1

    toggleOkClicked(); // if clicked, unclick btn => if unclicked, click btn

    submitVote(value);
	};

  return (
    <>
      <IconButton
        onClick={onClickIconButton}
        disabled={isDisabled}
        icon={<TiThumbsOk />}
        aria-label="Okay Hand Emoji, Click to upvote a post"
        fontSize="sm"
        colorScheme="blue"
        color="blue.900"
        variant={okClicked ? 'solid' : 'outline'}
        mr={2}
      />
      <Text fontSize="md" fontWeight="normal" color="black">
        {votes}
      </Text>
    </>
  );
};

export default ClapButton;