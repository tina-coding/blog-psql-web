import { Box, Button } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../../../components';
import { useUpdatePostMutation } from '../../../generated/graphql';
import { usePostFromQueryParams } from '../../../hooks/usePostFromQueryParam';
import Layout from '../../../layouts/Layout';
import { createUrqlClient } from '../../../utils/createUrqlClient';

interface IEditPostProps {}

const EditPost: React.FC<IEditPostProps> = ({ }) => {
	const router = useRouter();
  const {
		post: [{ data, fetching }],
		postId
  } = usePostFromQueryParams();

	const [, updatePost] = useUpdatePostMutation();
	const onSubmit = async (values: {
    title: string;
    description: string;
}, formikHelpers: FormikHelpers<{
    title: string;
    description: string;
}>) => {
		const { data, error } = await updatePost({ options: { id: postId, ...values } });
		if (!error) {
			router.back();
		}
	}
  return (
    <Layout>
      {!fetching && data?.post && (
        <Formik
          enableReinitialize={true}
          initialValues={{ title: data.post.title, description: data.post.description }}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="title"
                placeholder="Title of Post"
                label="Title"
              />
              <Box marginY={4}>
                <InputField
                  name="description"
                  placeholder="What's on your mind..."
                  label="Description"
                  textarea={true}
                />
              </Box>
              <Button
                type="submit"
                colorScheme="cyan"
                isLoading={isSubmitting}
                loadingText="Submitting"
              >
                Update Post
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditPost);
