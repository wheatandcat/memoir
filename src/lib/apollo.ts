import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const makeApolloClient = async () => {
  const uri = `${process.env.API_HOST}/query`;
  const authLink = setContext(async (_, { headers }) => {
    return {
      headers: {
        ...headers,
        UserID: 'aaaa',
      },
    };
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
