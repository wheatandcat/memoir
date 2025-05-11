import Auth from "@/lib/auth";
import { errorCode } from "@/lib/error";
import { getItem, removeItem, storageKey } from "@/lib/storage";
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  concat,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import Constants from "expo-constants";
import { Alert } from "react-native";

const cache = new InMemoryCache();
const auth = new Auth();

type Param = {
  Authorization?: string;
  UserID?: string;
};

const makeApolloClient = () => {
  const uri = `${Constants.expoConfig?.extra?.API_HOST}/query`;
  console.log("APP_ENV:", Constants.expoConfig?.extra?.APP_ENV);

  const authLink = setContext(async (_, { headers }) => {
    const h = headers;
    const param: Param = {};
    const token = await auth.getIdToken();

    console.log("token:", token);

    if (token) {
      param.Authorization = `Bearer ${token}`;
    } else {
      const userID = await getItem(storageKey.USER_ID_KEY);
      console.log("userID:", userID);

      if (userID) {
        param.UserID = userID;
      }
    }

    return {
      headers: {
        ...h,
        ...param,
      },
    };
  });

  const middlewareLink = new ApolloLink((operation, forward) => {
    console.log(
      "operation:",
      operation.operationName,
      ",variables:",
      operation.variables
    );

    return forward(operation).map((data) => {
      //console.log('data:', data);
      return data;
    });
  });

  const errorLink = onError((error) => {
    if ((error.graphQLErrors || []).length > 0) {
      const graphQLErrors = error.graphQLErrors || [
        {
          message: "エラー発生しました",
          extensions: { code: errorCode.CodeDefault },
        },
      ];

      const code = graphQLErrors[0]?.extensions?.code ?? errorCode.CodeDefault;

      let message = graphQLErrors[0].message;
      if (code === errorCode.CodeValidation) {
        message = graphQLErrors[0].message.split(":")?.[1] || message;
      }

      /*
      Sentry.Native.withScope((scope) => {
        scope.setTag("kind", "GraphQL");
        scope.setTag("operationName", error.operation.operationName);
        scope.setExtra("query", error.operation.query.loc?.source?.body || "");
        scope.setExtra("variables", error.operation.variables);
        scope.setExtra("errorCode", code);
        Sentry.Native.captureMessage(message);
      });
      */

      console.log("error: operation:", error.operation.operationName, message);

      Alert.alert("エラー", message, [
        {
          text: "OK",
          onPress: async () => {
            if (message.trim() === "User Invalid") {
              await auth.logout();
              await removeItem(storageKey.USER_ID_KEY);
            }
          },
        },
      ]);
    }
  });

  return new ApolloClient({
    link: concat(
      middlewareLink,
      errorLink.concat(authLink.concat(createHttpLink({ uri })))
    ),
    cache: cache,
  });
};

export default makeApolloClient;
