import React from 'react';
import { GraphQLHandler, GraphQLRequest } from 'msw';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { render } from '@testing-library/react-native';
import { server } from 'mocks/server';
import fetch from 'cross-fetch';

const link = createHttpLink({
  uri: '',
  fetch,
  credentials: 'same-origin',
});

const client = new ApolloClient({
  link,
  uri: '',
  cache: new InMemoryCache(),
});

export const testRenderer =
  (children: React.ReactNode) =>
  (responseOverride?: GraphQLHandler<GraphQLRequest<never>>) => {
    if (responseOverride) {
      server.use(responseOverride);
    }
    render(<ApolloProvider client={client}>{children}</ApolloProvider>);
  };
