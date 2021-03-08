import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import { cacheExchange, QueryInput, Cache} from '@urql/exchange-graphcache';
import { Provider, createClient, dedupExchange, fetchExchange } from 'urql';
import { CurrentUserDocument, CurrentUserQuery, LoginDocument, LoginMutation, RegisterMutation } from '../generated/graphql';

import theme from '../theme';

function typesafeUpdateQuery<Result, Query>(
  cache: Cache,
  queryInput: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(queryInput, (data) => fn(result, data as any) as any);
}
const client = createClient({
  url: "http://localhost:4000/graphql", fetchOptions: {
  credentials: "include",
  },
  exchanges: [dedupExchange, cacheExchange({
    updates: {
      Mutation: {
        login: (result, args, cache, info) => {
          typesafeUpdateQuery<LoginMutation, CurrentUserQuery>(cache, { query: CurrentUserDocument }, result, (result, query) => {
            if (result.login.errors) { return query; } else {
              return {
              currentUser: result.login.user
            }
          }

          })
        },
        register: (result, args, cache, info) => {
          typesafeUpdateQuery<RegisterMutation, CurrentUserQuery>(cache, { query: CurrentUserDocument }, result, (result, query) => {
            if (result.register.errors) { return query; } else {
              return {
              currentUser: result.register.user
            }
          }

          })
        }
      }
    }
  }), fetchExchange]
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
