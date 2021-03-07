import { Box, Text } from '@chakra-ui/react';

import Navbar from '../components/Navbar';
import Wrapper from '../components/Wrapper';

const Index = () => (
  <>
    <Navbar />
    <Wrapper>
      <Box as="section" bg={"white"} py="12" boxShadow="lg" borderRadius="lg">
        <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ md: '8' }}>
          <Text fontSize="lg" fontWeight="bold">Username</Text>
          <Text fontSize="md" fontWeight="normal">created at</Text>
        </Box>
      </Box>
    </Wrapper>
  </>
);

export default Index;
