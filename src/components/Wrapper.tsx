import { Box } from '@chakra-ui/layout';
import React from 'react';

interface IWrapperProps {
  variant?: 'small' | 'regular';
}

const Wrapper: React.FC<IWrapperProps> = ({
  children,
  variant = 'regular'
}) => {
  return (
    <Box
      mt={8}
      mx="auto"
      maxW={variant === 'regular' ? '800px' : '400px'}
      w="100%"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
