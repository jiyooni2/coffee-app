import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../screens/Profile";
import Home from "../screens/Home";
import Search from "../screens/Search";
import { Image } from "react-native";

const Stack = createStackNavigator();

export default function SharedStackNav({ screenName }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "red",
        },
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    >
      {screenName === "Home" ? (
        <Stack.Screen name="Home" component={Home} />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen name="Search" component={Search} />
      ) : null}

      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}
