import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import colors from "../colors";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";

const LoginLink = styled.Text`
  margin-top: 20px;
  color: ${colors.blue};
  font-weight: 600;
`;

function Welcome({ navigation }) {
  return (
    <AuthLayout>
      <AuthButton
        text="Create New Account"
        onPress={() => navigation.navigate("CreateAccount")}
        disabled={false}
      ></AuthButton>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <LoginLink>Log in</LoginLink>
      </TouchableOpacity>
    </AuthLayout>
  );
}

export default Welcome;
