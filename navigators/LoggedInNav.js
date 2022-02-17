import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "../screens/Feed";
import React from "react";

const Tabs = createBottomTabNavigator();

function LoggedInNav() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Feed" component={Feed} />
      <Tabs.Screen name="Popular" component={Feed} />
    </Tabs.Navigator>
  );
}

export default LoggedInNav;
