import { cacheExchange } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange } from "urql";
import { LogoutMutation, CurrentUserQuery, CurrentUserDocument, LoginMutation, RegisterMutation } from "../generated/graphql";
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