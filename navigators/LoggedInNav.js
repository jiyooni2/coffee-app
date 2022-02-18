import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "../screens/Feed";
import React from "react";
import Notifications from "./../screens/Notifications";
import Profile from "./../screens/Profile";
import Search from "./../screens/Search";
import TabIcon from "./../components/nav/TabIcon";
import SharedStackNav from "./SharedStackNav";

const Tabs = createBottomTabNavigator();

function LoggedInNav() {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: "black",
          borderTopColor: "rgba(255,255,255,0.5)",
          justifyContent: "center",
          alignContent: "center",
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="Feed"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            //color = ActiveTintColor
            <TabIcon iconName={"home"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Feed" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="Notifications"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            //color = ActiveTintColor
            <TabIcon iconName={"heart"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Notifications" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="Camera"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            //color = ActiveTintColor
            <TabIcon iconName={"camera"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Camera" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            //color = ActiveTintColor
            <TabIcon iconName={"person"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Profile" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            //color = ActiveTintColor
            <TabIcon iconName={"search"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Search" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}

export default LoggedInNav;
