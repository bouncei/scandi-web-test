import {
  ApolloClient,
  ApploProvider,
  useQuery,
  gql,
  InMemoryCache,
} from "@apollo/client";

// Initializing ApolloClient, passing it's constructor a configuration object with uri and cache fields
const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io", // uri specifies the Url Of our GraphQL server
  cache: new InMemoryCache(), //cache is an instance of InMemoryCache, which Apollo Client uses to cache query results after fetching them.
});

export default client;
