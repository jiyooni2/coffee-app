import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

export const logUserIn = async (token) => {
  await AsyncStorage.multiSet([
    ["token", token],
    ["loggedIn", "yes"],
  ]);
  isLoggedInVar(true);
  tokenVar(token);
};

export const logUserOut = async () => {
  await AsyncStorage.removeItem("token");
  isLoggedInVar(false);
  tokenVar(null);
};

const httpLink = createHttpLink({
  uri: "https://plastic-seahorse-87.loca.lt/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: token ? tokenVar() : null,
    },
  };
});

const client = new ApolloClient({
  uri: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
