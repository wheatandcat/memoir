import { setContext } from '@apollo/client/link/context';
import { Alert } from 'react-native';
import { onError } from '@apollo/client/link/error';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
  concat,
} from '@apollo/client';
import { storageKey, getItem, removeItem } from 'lib/storage';
import Auth from 'lib/auth';
import * as Sentry from 'sentry-expo';
import { errorCode } from 'lib/error';

const cache = new InMemoryCache();
const auth = new Auth();

type Param = {
  Authorization?: string;
  UserID?: string;
};

const makeApolloClient = async () => {
  const uri = `${process.env.API_HOST}/query`;

  const authLink = setContext(async (_, { headers }) => {
    const h = headers;
    const param: Param = {};
    const token = await auth.getIdToken();

    //console.log('token:', token);

    if (token) {
      param.Authorization = `Bearer ${token}`;
    } else {
      const userID = await getItem(storageKey.USER_ID_KEY);

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
    console.log('operation:', operation.operationName);

    return forward(operation).map((data) => {
      //console.log('data:', data);
      return data;
    });
  });

  const errorLink = onError((error) => {
    if ((error.graphQLErrors || []).length > 0) {
      const graphQLErrors = error.graphQLErrors || [
        {
          message: 'エラー発生しました',
          extensions: { code: errorCode.CodeDefault },
        },
      ];

      const code = graphQLErrors[0]?.extensions?.code ?? errorCode.CodeDefault;

      let message = graphQLErrors[0].message;
      if (code === errorCode.CodeValidation) {
        message = graphQLErrors[0].message.split(':')?.[1] || message;
      }

      Sentry.Native.withScope((scope) => {
        scope.setTag('kind', 'GraphQL');
        scope.setTag('operationName', error.operation.operationName);
        scope.setExtra('query', error.operation.query.loc?.source?.body || '');
        scope.setExtra('variables', error.operation.variables);
        scope.setExtra('errorCode', code);
        Sentry.Native.captureMessage(message);
      });

      console.log('error: operation:', error.operation.operationName, message);

      Alert.alert('エラー', message, [
        {
          text: 'OK',
          onPress: async () => {
            if (message.trim() === 'User Invalid') {
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
