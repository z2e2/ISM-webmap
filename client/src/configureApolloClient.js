import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from 'apollo-link-error';
import apolloLogger from 'apollo-link-logger';
import { HttpLink } from 'apollo-link-http';

import { setContext } from 'apollo-link-context';

import fetch from 'node-fetch';

const isProd = process.env.NODE_ENV === 'production';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem('auth');
  return {
    headers: {
      ...headers,
      Subdomain: window.location.host,
      Authorization: token ? token : null
    }
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(error => {
      if (error.message === 'Forbidden' || error.message === 'Invalid/expired authentication') {
        window.location.assign('/greenr/login');
      }
    });
  }
});

const links = [authLink, errorLink, httpLink];
export const client = new ApolloClient({
  link: ApolloLink.from(isProd ? links : [apolloLogger, ...links]),
  cache: new InMemoryCache()
});
