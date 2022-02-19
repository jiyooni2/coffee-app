import React from "react";
import styled from "styled-components/native";
import Welcome from "./Welcome";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import { createStackNavigator } from "@react-navigation/stack";
import { isLoggedInVar, logUserOut, usernameVar } from "./../apollo";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useQuery, useReactiveVar } from "@apollo/client";
import { gql } from "@apollo/client";
import { ActivityIndicator } from "react-native";

const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: black;
`;

const Text = styled.Text`
  color: white;
  font-size: 50px;
`;
const Info = styled.Text`
  color: white;
  font-size: 20px;
`;

const SEE_USER_QUERY = gql`
  query ($username: String!) {
    seeUser(username: $username) {
      id
      username
      location
      email
      name
      totalFollowers
      totalFollowing
    }
  }
`;

const Stack = createStackNavigator();

function Profile() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const username = useReactiveVar(usernameVar);

  const { data, loading } = useQuery(SEE_USER_QUERY, {
    variables: {
      username,
    },
  });

  console.log("logged", data);
  console.log("logged", username);

  return isLoggedIn ? (
    <Container>
      <Text>Profile</Text>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <>
          <Info>{data?.seeUser?.username}</Info>
          <Info>{data?.seeUser?.location}</Info>
          <Info>{data?.seeUser?.name}</Info>
          <Info>{data?.seeUser?.totalFollowers}</Info>
          <Info>{data?.seeUser?.totalFollowing}</Info>
        </>
      )}

      <TouchableOpacity onPress={logUserOut}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </Container>
  ) : (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitle: () => false,
        headerTransparent: true,
        headerTintColor: "white",
      }}
      initialRouteName="Welcome"
    >
      <Stack.Screen
        name="Welcome"
        options={{ headerShown: false }}
        component={Welcome}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
    </Stack.Navigator>
  );
}

export default Profile;
