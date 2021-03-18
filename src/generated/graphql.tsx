import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  posts: PostPagination;
  post?: Maybe<Post>;
  cachedPost: CachedPost;
  getUsers?: Maybe<Array<User>>;
  currentUser?: Maybe<User>;
};


export type QueryPostsArgs = {
  options: PostPaginateInput;
};


export type QueryPostArgs = {
  id: Scalars['Float'];
};


export type QueryCachedPostArgs = {
  key: Scalars['String'];
};

export type PostPagination = {
  __typename?: 'PostPagination';
  posts: Array<Post>;
  total: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Int'];
  authorId: Scalars['Float'];
  author: User;
  hasVoted?: Maybe<Scalars['Int']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  votes: Scalars['Int'];
  postDescSnippet: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  userEmail: Scalars['String'];
};

export type PostPaginateInput = {
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
};

export type CachedPost = {
  __typename?: 'CachedPost';
  title: Scalars['String'];
  description: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  voteOnPost: Scalars['Boolean'];
  clearPostCache: Scalars['Boolean'];
  cachePost: Scalars['String'];
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePostById: Scalars['Boolean'];
  deletePosts: Scalars['Boolean'];
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
};


export type MutationVoteOnPostArgs = {
  options: VoteInput;
};


export type MutationClearPostCacheArgs = {
  key: Scalars['String'];
};


export type MutationCachePostArgs = {
  options: CreatePostInput;
};


export type MutationCreatePostArgs = {
  options: CreatePostInput;
};


export type MutationUpdatePostArgs = {
  options: UpdatePostInput;
};


export type MutationDeletePostByIdArgs = {
  id: Scalars['Float'];
};


export type MutationDeletePostsArgs = {
  options: DeletePostsInput;
};


export type MutationChangePasswordArgs = {
  options: ChangePasswordInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationLoginArgs = {
  options: LoginInput;
};

export type VoteInput = {
  postId: Scalars['Int'];
  value: Scalars['Int'];
};

export type CreatePostInput = {
  /** Title for the post */
  title: Scalars['String'];
  /** Description for the post, the content for the post. */
  description?: Maybe<Scalars['String']>;
};

export type UpdatePostInput = {
  id: Scalars['Float'];
  title: Scalars['String'];
  description: Scalars['String'];
};

export type DeletePostsInput = {
  ids: Array<Scalars['Float']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ChangePasswordInput = {
  token: Scalars['String'];
  newPassword: Scalars['String'];
};

export type RegisterInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type PostDetailsFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'title' | 'createdAt' | 'postDescSnippet' | 'hasVoted' | 'votes' | 'authorId'>
);

export type UserDetailsFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type UserErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type UserResponseFragmentFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & UserErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & UserDetailsFragment
  )> }
);

export type CachePostMutationVariables = Exact<{
  options: CreatePostInput;
}>;


export type CachePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'cachePost'>
);

export type ChangePasswordMutationVariables = Exact<{
  options: ChangePasswordInput;
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & UserResponseFragmentFragment
  ) }
);

export type ClearPostCacheMutationVariables = Exact<{
  key: Scalars['String'];
}>;


export type ClearPostCacheMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'clearPostCache'>
);

export type CreatePostMutationVariables = Exact<{
  options: CreatePostInput;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & PostDetailsFragment
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  options: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & UserResponseFragmentFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & UserResponseFragmentFragment
  ) }
);

export type VoteOnPostMutationVariables = Exact<{
  options: VoteInput;
}>;


export type VoteOnPostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'voteOnPost'>
);

export type CachedPostQueryVariables = Exact<{
  key: Scalars['String'];
}>;


export type CachedPostQuery = (
  { __typename?: 'Query' }
  & { cachedPost: (
    { __typename?: 'CachedPost' }
    & Pick<CachedPost, 'title' | 'description'>
  ) }
);

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & UserDetailsFragment
  )> }
);

export type PostsQueryVariables = Exact<{
  options: PostPaginateInput;
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: (
    { __typename?: 'PostPagination' }
    & Pick<PostPagination, 'total'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & { author: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ) }
      & PostDetailsFragment
    )> }
  ) }
);

export const PostDetailsFragmentDoc = gql`
    fragment PostDetails on Post {
  id
  title
  createdAt
  postDescSnippet
  hasVoted
  votes
  authorId
}
    `;
export const UserErrorFragmentDoc = gql`
    fragment UserError on FieldError {
  field
  message
}
    `;
export const UserDetailsFragmentDoc = gql`
    fragment UserDetails on User {
  id
  username
}
    `;
export const UserResponseFragmentFragmentDoc = gql`
    fragment UserResponseFragment on UserResponse {
  errors {
    ...UserError
  }
  user {
    ...UserDetails
  }
}
    ${UserErrorFragmentDoc}
${UserDetailsFragmentDoc}`;
export const CachePostDocument = gql`
    mutation CachePost($options: CreatePostInput!) {
  cachePost(options: $options)
}
    `;

export function useCachePostMutation() {
  return Urql.useMutation<CachePostMutation, CachePostMutationVariables>(CachePostDocument);
};
export const ChangePasswordDocument = gql`
    mutation ChangePassword($options: ChangePasswordInput!) {
  changePassword(options: $options) {
    ...UserResponseFragment
  }
}
    ${UserResponseFragmentFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const ClearPostCacheDocument = gql`
    mutation ClearPostCache($key: String!) {
  clearPostCache(key: $key)
}
    `;

export function useClearPostCacheMutation() {
  return Urql.useMutation<ClearPostCacheMutation, ClearPostCacheMutationVariables>(ClearPostCacheDocument);
};
export const CreatePostDocument = gql`
    mutation CreatePost($options: CreatePostInput!) {
  createPost(options: $options) {
    ...PostDetails
  }
}
    ${PostDetailsFragmentDoc}`;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($options: LoginInput!) {
  login(options: $options) {
    ...UserResponseFragment
  }
}
    ${UserResponseFragmentFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: RegisterInput!) {
  register(options: $options) {
    ...UserResponseFragment
  }
}
    ${UserResponseFragmentFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const VoteOnPostDocument = gql`
    mutation VoteOnPost($options: VoteInput!) {
  voteOnPost(options: $options)
}
    `;

export function useVoteOnPostMutation() {
  return Urql.useMutation<VoteOnPostMutation, VoteOnPostMutationVariables>(VoteOnPostDocument);
};
export const CachedPostDocument = gql`
    query CachedPost($key: String!) {
  cachedPost(key: $key) {
    title
    description
  }
}
    `;

export function useCachedPostQuery(options: Omit<Urql.UseQueryArgs<CachedPostQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CachedPostQuery>({ query: CachedPostDocument, ...options });
};
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    ...UserDetails
  }
}
    ${UserDetailsFragmentDoc}`;

export function useCurrentUserQuery(options: Omit<Urql.UseQueryArgs<CurrentUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CurrentUserQuery>({ query: CurrentUserDocument, ...options });
};
export const PostDocument = gql`
    query Post($id: Int!) {
  post(id: $id) {
    id
    createdAt
    updatedAt
    title
    description
    votes
    hasVoted
    author {
      id
      username
    }
  }
}
    `;
export const PostsDocument = gql`
    query Posts($options: PostPaginateInput!) {
  posts(options: $options) {
    posts {
      ...PostDetails
      author {
        id
        username
      }
    }
    total
  }
}
    ${PostDetailsFragmentDoc}`;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};