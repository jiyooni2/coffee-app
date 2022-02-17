import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import CreateAccount from "../screens/CreateAccount";

const Stack = createStackNavigator();

function LoggedOutNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: "black",
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

export default LoggedOutNav;
