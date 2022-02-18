import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../screens/Profile";
import Feed from "../screens/Feed";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Photo from "../screens/Photo";
import { Image } from "react-native";

const Stack = createStackNavigator();

export default function SharedStackNav({ screenName }) {
  return (
    <Stack.Navigator
      mode="card"
      headerMode="screen"
      screenOptions={{
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "red",
        },
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    >
      {screenName === "Feed" ? (
        <Stack.Screen
          name="Feed"
          component={Feed}
          options={{
            headerTitle: () => (
              <Image
                style={{
                  maxWidth: "100%",
                  maxHeight: 100,
                }}
                resizeMode="center"
                source={require("../assets/logo.png")}
              />
            ),
          }}
        />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen name="Search" component={Search} />
      ) : null}
      {screenName === "Notifications" ? (
        <Stack.Screen name="Notifications" component={Notifications} />
      ) : null}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Photo" component={Photo} />
    </Stack.Navigator>
  );
}
