import { Box, Button, FormErrorMessage, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { InputField, Wrapper } from '../components';

import { useForgotPasswordMutation } from '../generated/graphql';

import { toFormikError } from '../utils/convertError';
import { createUrqlClient } from '../utils/createUrqlClient';

const ForgotPassword: NextPage = () => {
  const [, forgotPassword] = useForgotPasswordMutation();
  const toast = useToast();

	const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values) => {
          const response = await forgotPassword(values);
          // this will always return true
          if (response.data?.forgotPassword) {
            const toastDesc = 'Email has been sent to that address.';
            toast({
              title: 'Email Sent',
              description: toastDesc,
              status: 'success',
              duration: 9000,
              position: 'top-right',
              isClosable: true
						});

						// redirect user to the login screen after toast is hidden
						setTimeout(() => {
							router.push('/login');
						}, 9000)
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box my={4}>
              <InputField
                name="email"
                placeholder="Email"
                label="Email"
                type="email"
                required={true}
              />
            </Box>
            <Button
              type="submit"
              colorScheme="cyan"
              isLoading={isSubmitting}
              loadingText="Submitting"
            >
              Reset Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
