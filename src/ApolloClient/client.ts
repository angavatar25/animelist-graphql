import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";

const baseLink = new HttpLink({
  uri: 'https://graphql.anilist.co',
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([baseLink]),
});