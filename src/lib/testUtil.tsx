import React from 'react';
import { GraphQLHandler, GraphQLRequest } from 'msw';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { render } from '@testing-library/react';
import { server } from 'mocks/server';

const link = createHttpLink({
  uri: 'http://localhost:8080',
  credentials: 'same-origin',
});

const client = new ApolloClient({
  link,
  uri: 'http://localhost:8080',
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
