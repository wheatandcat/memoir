import { setContext } from '@apollo/client/link/context';
import { Alert } from 'react-native';
import { onError } from '@apollo/client/link/error';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { storageKey, getItem, removeItem } from 'lib/storage';
import Auth from 'lib/auth';
import * as Sentry from 'sentry-expo';

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

  const errorLink = onError((error) => {
    if ((error.graphQLErrors || []).length > 0) {
      const graphQLErrors = error.graphQLErrors || [
        { message: 'エラー発生しました' },
      ];

      const message = graphQLErrors[0].message;

      Sentry.Native.withScope((scope) => {
        scope.setTag('kind', 'GraphQL');
        scope.setTag('operationName', error.operation.operationName);
        scope.setExtra('query', error.operation.query.loc?.source?.body || '');
        scope.setExtra('variables', error.operation.variables);
        Sentry.Native.captureMessage(message);
      });

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
    link: errorLink.concat(authLink.concat(createHttpLink({ uri }))),
    cache: cache,
  });
};

export default makeApolloClient;
