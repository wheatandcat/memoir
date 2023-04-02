import React from 'react';
import { RecoilRoot } from 'recoil';
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
import { NavigationContainer } from '@react-navigation/native';

const link = createHttpLink({
  uri: 'http://localhost:8080/query',
  fetch,
  credentials: 'same-origin',
});

const client = new ApolloClient({
  link,
  uri: 'http://localhost:8080/query',
  cache: new InMemoryCache(),
});

export const testRenderer =
  (children: React.ReactNode) =>
  (responseOverride?: GraphQLHandler<GraphQLRequest<never>>) => {
    if (responseOverride) {
      server.use(responseOverride);
    }
    return render(
      <RecoilRoot>
        <NavigationContainer independent={true}>
          <ApolloProvider client={client}>{children}</ApolloProvider>
        </NavigationContainer>
      </RecoilRoot>
    );
  };
