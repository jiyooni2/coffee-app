import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import LoggedOutNav from "./navigators/LoggedOutNav";
import { NavigationContainer, ThemeProvider } from "@react-navigation/native";
import { Appearance } from "react-native";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client from "./apollo";
import { AppRegistry } from "react-native";
import { isLoggedInVar } from "./apollo";
import LoggedInNav from "./navigators/LoggedInNav";

function App() {
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const onFinish = () => setLoading(false);
  const preload = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [
      require("./assets/logo.png"),
      "https://image.similarpng.com/very-thumbnail/2020/06/Instagram-name-logo-transparent-PNG.png",
    ];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    return Promise.all([...fontPromises, ...imagePromises]);
  };

  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }

  const subscription = Appearance.addChangeListener(({ colorScheme }) => {
    console.log(colorScheme);
  });

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
