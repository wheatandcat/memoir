import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { render } from "@testing-library/react-native";
import fetch from "cross-fetch";
import { server } from "mocks/server";
import type { GraphQLHandler } from "msw";
import type React from "react";
import { RecoilRoot } from "recoil";

const link = createHttpLink({
  uri: "http://localhost:8080/query",
  fetch,
  credentials: "same-origin",
});

const client = new ApolloClient({
  link,
  uri: "http://localhost:8080/query",
  cache: new InMemoryCache(),
});

export const testRenderer =
  (children: React.ReactNode) => (responseOverride?: GraphQLHandler) => {
    if (responseOverride) {
      server.use(responseOverride);
    }
    return render(
      <RecoilRoot>
        <NavigationContainer>
          <ApolloProvider client={client}>{children}</ApolloProvider>
        </NavigationContainer>
      </RecoilRoot>,
    );
  };
