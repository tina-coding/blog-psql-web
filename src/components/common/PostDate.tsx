import { Flex, Icon, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BsClockHistory } from 'react-icons/bs';
import { formatDate } from '../../utils/formatDate';
interface IPostDateProps {
  isoDate: string;
  label: string;
  variant?: 'sm' | 'md' | 'lg';
}

const PostDate: React.FC<IPostDateProps> = ({
  isoDate,
  label,
  variant = 'md'
}) => {
  const [formattedDate, setFormattedDate] = useState('');
  useEffect(() => {
    const date = formatDate(isoDate).replaceAll('/', '.');
   setFormattedDate(date ?? '');
  }, [isoDate])
  return (
    <Flex alignItems="center" mr={3} fontSize={variant}>
      <Icon as={BsClockHistory} mr={2} color="purple.800" />
      <Text color="gray.500" pr={1}>
        {label} •
      </Text>
      <Text pl={1} color="purple.800" fontWeight="semibold">
        {formattedDate}
      </Text>
    </Flex>
  );
};

export default PostDate;
