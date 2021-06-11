import { setContext } from '@apollo/client/link/context';
import { Alert } from 'react-native';
import { onError } from '@apollo/client/link/error';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageKey } from 'lib/storage';
import Auth from 'lib/auth';

export const cache = new InMemoryCache();
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
      const userID = await AsyncStorage.getItem(storageKey.USER_ID_KEY);

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
    console.log('aaa:', error.graphQLErrors);
    if ((error.graphQLErrors || []).length > 0) {
      const graphQLErrors = error.graphQLErrors || [
        { message: 'エラー発生しました' },
      ];

      const message = graphQLErrors[0].message;
      Alert.alert('エラー', message);
    }
  });

  return new ApolloClient({
    link: errorLink.concat(authLink.concat(createHttpLink({ uri }))),
    cache: cache,
  });
};

export default makeApolloClient;
