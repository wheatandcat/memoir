import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const makeApolloClient = async () => {
  const uri = `${process.env.API_HOST}/query`;

  const authLink = setContext(async (_, { headers }) => {
    const ctx = {
      headers,
    };

    const uid = await AsyncStorage.getItem('USER_ID');
    if (uid) {
      ctx.headers.UserID = uid;
    }

    return ctx;
  });

  const errorLink = onError((error) => {
    console.log(error);
  });

  return new ApolloClient({
    link: errorLink.concat(authLink.concat(createHttpLink({ uri }))),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            project: {
              merge: true,
            },
          },
        },
      },
    }),
  });
};

export default makeApolloClient;
