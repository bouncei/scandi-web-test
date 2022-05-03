import { ApolloClient, InMemoryCache } from "@apollo/client";

// Initializing ApolloClient, passing it's constructor a configuration object with uri and cache fields
const client = new ApolloClient({
  uri: "http://localhost:4000", // uri specifies the Url Of our GraphQL server
  cache: new InMemoryCache(), //cache is an instance of InMemoryCache, which Apollo Client uses to cache query results after fetching them.
});

export default client;
