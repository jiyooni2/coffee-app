import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import TakePhoto from "../screens/TakePhoto";
import SelectPhoto from "./../screens/SelectPhoto";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function UploadNav() {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: "black",
          indicatorStyle: {
            backgroundColor: "white",
          },
        },
      }}
    >
      <Tab.Screen name="Select">
        {() => (
          <Stack.Navigator
            screenOptions={{
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: "black",
                shadowOpacity: 0.3,
              },
              headerBackImage: ({ tintColor }) => (
                <Ionicons color={tintColor} name="close" size={28} />
              ),
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="SelectScreen"
              options={{ title: "Choose a photo" }}
              component={SelectPhoto}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="Take" component={TakePhoto} />
    </Tab.Navigator>
  );
}
