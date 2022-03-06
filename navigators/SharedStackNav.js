import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Profile from "../screens/Profile";
import Home from "../screens/Home";
import Search from "../screens/Search";
import { Image } from "react-native";
import ShopScreen from "../screens/ShopScreen";

const Stack = createStackNavigator();

export default function SharedStackNav({ screenName }) {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "navy",
          height: 100,
        },
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    >
      {screenName === "Home" ? (
        <Stack.Screen
          name="HomeScreen"
          component={Home}
          options={{
            headerTitle: () => (
              <Image
                style={{ maxWidth: "100%", height: "100%" }}
                resizeMode="contain"
                source={require("../assets/logo.png")}
              />
            ),
          }}
        />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen name="SearchScreen" component={Search} />
      ) : null}
      <Stack.Screen name="ProfileScreen" component={Profile} />

      <Stack.Screen name="ShopScreen" component={ShopScreen} />
    </Stack.Navigator>
  );
}
