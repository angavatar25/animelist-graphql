import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { RestLink } from "apollo-link-rest";

const baseLink = new HttpLink({
  uri: 'https://graphql.anilist.co',
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([baseLink]),
});