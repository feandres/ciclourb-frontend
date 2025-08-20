import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
//   headers: {
    // Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHQL_TOKEN}`, // se precisar
//   },
  cache: new InMemoryCache(),
});

export default client;
