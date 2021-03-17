import { Box } from '@chakra-ui/layout';
import React from 'react';

type VariantType = Record<'small' | 'medium' | 'large', string>;
const VARIANTS: VariantType = {
  small: '400px',
  medium: '800px',
  large: '1200px'
}
export interface IWrapperVariantProps {
  variant?: keyof VariantType;
}
const Wrapper: React.FC<IWrapperVariantProps> = ({
  children,
  variant = 'medium'
}) => {
  return (
    <Box
      mt={8}
      mx="auto"
      maxW={VARIANTS[variant]}
      w="100%"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
