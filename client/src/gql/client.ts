import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "cache-first",
    },
  },
  link: createHttpLink({
    uri: import.meta.env.REACT_APP_GRAPHQL_API_URL,
    credentials: "include",
  }),
});

export default client;
