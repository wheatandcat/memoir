import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const cache = new InMemoryCache();

const makeApolloClient = async () => {
  const uri = `${process.env.API_HOST}/query`;

  const authLink = setContext(async (_, { headers }) => {
    const uid = await AsyncStorage.getItem('USER_ID');

    if (uid) {
      return {
        headers: {
          ...headers,
          UserID: uid,
        },
      };
    }

    return {
      headers: {
        ...headers,
      },
    };
  });

  const errorLink = onError((error) => {
    console.log(error);
  });

  return new ApolloClient({
    link: errorLink.concat(authLink.concat(createHttpLink({ uri }))),
    cache: cache,
  });
};

export default makeApolloClient;
