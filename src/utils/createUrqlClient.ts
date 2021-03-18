import { cacheExchange } from "@urql/exchange-graphcache";
import gql from 'graphql-tag';
import { dedupExchange, fetchExchange } from "urql";
import { CurrentUserDocument, CurrentUserQuery, LoginMutation, LogoutMutation, RegisterMutation, VoteOnPostMutationVariables } from "../generated/graphql";
import { typesafeUpdateQuery } from "./typesafeUpdateQuery";


export const createUrqlClient = (ssrExchange: any) => ({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include' as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          voteOnPost: (result, args, cache, info) => {
            const { options: { postId, value }} = args as VoteOnPostMutationVariables;
            const data = cache.readFragment(
              gql`
                fragment _ on Post {
                  id
                  votes
                }
              `, { id: postId }
            )

            if (data) {
              const updatedVotes = value === 1 ? data.votes  + 1 : data.votes - 1;
              cache.writeFragment(
                gql`
                  fragment __ on Post {
                    votes
                  }
                `, { id: postId, votes: updatedVotes }
              )
            }
          },
          logout: (result, args, cache, info) => {
            // set current user to null
            typesafeUpdateQuery<LogoutMutation, CurrentUserQuery>(
              cache,
              { query: CurrentUserDocument },
              result,
              () => ({ currentUser: null })
            );
          },
          login: (result, args, cache, info) => {
            typesafeUpdateQuery<LoginMutation, CurrentUserQuery>(
              cache,
              { query: CurrentUserDocument },
              result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    currentUser: result.login.user
                  };
                }
              }
            );
          },
          register: (result, args, cache, info) => {
            typesafeUpdateQuery<RegisterMutation, CurrentUserQuery>(
              cache,
              { query: CurrentUserDocument },
              result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    currentUser: result.register.user
                  };
                }
              }
            );
          }
        }
      }
		}),
		ssrExchange,
    fetchExchange
  ]
});