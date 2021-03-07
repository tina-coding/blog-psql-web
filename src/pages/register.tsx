import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
	Button,
	Box
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useMutation } from 'urql';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { useRegisterMutation } from '../generated/graphql';
import { toFormikError } from '../utils/convertError';
import { useRouter } from 'next/router';
interface IRegisterProps { }

const Register: React.FC<IRegisterProps> = ({ }) => {
  const router = useRouter();

	const [, register] = useRegisterMutation();

  return (
		<Wrapper variant="small">
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={ async (values, { setErrors }) => {
				const response = await register(values);

				// do something if there is an error
        if (response.data?.register.errors) {
          setErrors(toFormikError(response.data.register.errors));
        } else if (response.data?.register.user) {
          // user successfully registered
          router.push("/");
        }
      }}
    >
      {({ isSubmitting }) => (
          <Form>
						<InputField name="username" placeholder="Username" label="Username" />
						<Box marginY={4}>
						<InputField name="password" placeholder="Password" label="Password" type="password" />

						</Box>
						<Button type="submit" colorScheme="cyan" isLoading={isSubmitting} loadingText="Submitting">Register</Button>
          </Form>
      )}
    </Formik>
			</Wrapper>
  );
};

export default Register;
