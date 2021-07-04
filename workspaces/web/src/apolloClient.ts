import { ApolloClient, InMemoryCache } from '@apollo/client';

export const getApolloClient = () => new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache()
});
  