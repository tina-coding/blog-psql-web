import { Box, Button } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { InputField, Wrapper } from '../components';

import {
  useCreatePostMutation,
  useCachePostMutation,
  useClearPostCacheMutation,
  CreatePostInput,
  useCachedPostQuery
} from '../generated/graphql';
import Layout from '../layouts/Layout';

import { createUrqlClient } from '../utils/createUrqlClient';
import { isEmpty } from '../utils/isEmpty';

const CreatePost: React.FC = () => {
	const [cachedPostKey, setCachedPostKey] = useState('');
	const [formInitialValues, setFormInitialValues] = useState({ title: '', description: '' });


  const [, createPost] = useCreatePostMutation();
	const [, cachePost] = useCachePostMutation();
	const [, clearPostCache] = useClearPostCacheMutation();

  const [{ data, fetching }] = useCachedPostQuery({
    variables: { key: cachedPostKey }
  });
  const router = useRouter();

  useEffect(() => {
    const { key } = router.query;
    if (key) {
      setCachedPostKey(key as string);
    }
  }, [router]);

	useEffect(() => {
		if (data) {
			const { title, description } = data.cachedPost;
			setFormInitialValues({ title, description });
		}
  }, [data]);

  const submitCachePost = async (values: Required<CreatePostInput>) => {
    const { data, error } = await cachePost({ options: values });
    if (data?.cachePost) {
      router.push(`/login?key=${data.cachePost}`);
    } else {
      console.warn('no key');
    }
	};

	const onSubmit = async (
    values: {
      title: string;
      description: string;
    },
    { setErrors }: FormikHelpers<{
    title: string;
    description: string;
}>
	) => {
    const { data, error } = await createPost({ options: values });
    if (error?.message.includes('unauthorized')) {
      // cache existing post data
      const { description, title } = values;
      isEmpty(description) && isEmpty(title)
        ? router.push('/login')
        : submitCachePost(values);
    } else {
      const hasKey = isEmpty(cachedPostKey);
      if (cachedPostKey !== '') {
        // clear the cache
        const { data, error } = await clearPostCache({ key: cachedPostKey });
        if (data?.clearPostCache) {
          router.push('/');
        }
      } else {
        router.push('/');
      }
    }
  };

  return (
    <Layout>
      {!fetching && (
        <Formik
				enableReinitialize={true}
          initialValues={formInitialValues}
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
                Create Post
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
