import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNav from "./TabNav";
import UploadNav from "./UploadNav";
import UploadForm from "./../screens/UploadForm";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();

function Nav() {
  return (
    <Stack.Navigator screenOptions={{ presentation: "modal" }}>
      <Stack.Screen
        name="Tabs"
        options={{ headerShown: false }}
        component={TabNav}
      />
      <Stack.Screen
        name="Upload"
        options={{ headerShown: false }}
        component={UploadNav}
      />
      <Stack.Screen
        name="UploadForm"
        options={{
          headerTintColor: "white",
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name="close" size={28} />
          ),
          title: "Upload",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTitleAlign: "center",
        }}
        component={UploadForm}
      />
    </Stack.Navigator>
  );
}

export default Nav;
