import { Box, Button, FormErrorMessage, useToast } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import { withUrqlClient, WithUrqlProps } from "next-urql";
import router from "next/router";
import { useState } from "react";
import InputField from "../../components/InputField";
import Wrapper from "../../components/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import { toFormikError } from "../../utils/convertError";
import { createUrqlClient } from "../../utils/createUrqlClient";
import login from "../login";

interface IChangePasswordProps{
	token: string;
}

const ChangePassword: NextPage<IChangePasswordProps> = ({ token }) => {
	const [, changePassword] = useChangePasswordMutation();
  const toast = useToast();
	return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: '', }}
        onSubmit={async (values, { setErrors }) => {
					const response = await changePassword({ options: { ...values, token } });

          // // do something if there is an error
					if (response.data?.changePassword.errors) {
						const formikError = toFormikError(response.data.changePassword.errors);
						if ("token" in formikError) {
              toast({
                title: 'Token Invalid',
                description: formikError.token,
                status: 'error',
                duration: 9000,
                position: 'top-right',
                isClosable: true
              });
						}
            setErrors(formikError);
          } else if (response.data?.changePassword.user) {
            // user successfully changePassword
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="New Password"
							label="New Password"
							type='password'
						/>
            <Button
              type="submit"
              colorScheme="cyan"
              isLoading={isSubmitting}
              loadingText="Submitting"
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}

ChangePassword.getInitialProps = ({ query }) => {
	return {
		token: query.token as string
	}
}

export default withUrqlClient(createUrqlClient)(ChangePassword);