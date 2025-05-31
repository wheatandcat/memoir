import { server } from "@/mocks/server";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { render } from "@testing-library/react-native";
import fetch from "cross-fetch";
import type { GraphQLHandler } from "msw";
import type React from "react";

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
    return render(<ApolloProvider client={client}>{children}</ApolloProvider>);
  };
