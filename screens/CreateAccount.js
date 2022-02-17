import React, { useRef, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { KeyboardAvoidingView } from "react-native-web";
import styled from "styled-components/native";
import colors from "../colors";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { TextInput } from "./../components/auth/AuthShared";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

function CreateAccount({ navigation }) {
  const onCompleted = (data) => {
    const {
      createAccount: { ok },
    } = data;
    const { username, password } = getValues();
    if (ok) {
      navigation.navigate("Login", {
        username,
        password,
      });
    }
  };

  const [createAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    { onCompleted }
  );

  const onValid = (data) => {
    if (!loading) {
      createAccountMutation({
        variables: { ...data },
      });
    }
  };

  const { register, handleSubmit, setValue, getValues, watch } = useForm();

  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  useEffect(() => {
    register("firstName", { required: true });
    register("lastName", { required: true, minLength: 3 });
    register("username", { required: true });
    register("email", { required: true });
    register("password", { required: true });
  }, [register]);

  return (
    <AuthLayout>
      <TextInput
        autoFocus
        onSubmitEditing={() => onNext(lastNameRef)}
        placeholder="First Name"
        returnKeyType="next"
        blurOnSubmit={false}
        placeholderTextColor={"rgba(255,255,255,0.8)"}
        onChangeText={(text) => {
          setValue("firstName", text);
        }}
      />
      <TextInput
        ref={lastNameRef}
        onSubmitEditing={() => onNext(usernameRef)}
        placeholder="Last Name"
        returnKeyType="next"
        blurOnSubmit={false}
        placeholderTextColor={"rgba(255,255,255,0.8)"}
        onChangeText={(text) => {
          setValue("lastName", text);
        }}
      />
      <TextInput
        onSubmitEditing={() => onNext(emailRef)}
        ref={usernameRef}
        placeholder="Username"
        returnKeyType="next"
        blurOnSubmit={false}
        placeholderTextColor={"rgba(255,255,255,0.8)"}
        onChangeText={(text) => {
          setValue("username", text);
        }}
      />
      <TextInput
        ref={emailRef}
        onSubmitEditing={() => onNext(passwordRef)}
        placeholder="Email"
        returnKeyType="next"
        keyboardType="email-address"
        blurOnSubmit={false}
        placeholderTextColor={"rgba(255,255,255,0.8)"}
        onChangeText={(text) => {
          setValue("email", text);
        }}
      />
      <TextInput
        onSubmitEditing={handleSubmit(onValid)}
        ref={passwordRef}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor={"rgba(255,255,255,0.8)"}
        returnKeyType="done"
        lastOne={true}
        onChangeText={(text) => {
          setValue("password", text);
        }}
      />
      <AuthButton
        disabled={
          !watch("firstName") ||
          !watch("lastName") ||
          !watch("username") ||
          !watch("email") ||
          !watch("password")
        }
        onPress={handleSubmit(onValid)}
        loading={loading}
        text="Create Account"
      />
    </AuthLayout>
  );
}

export default CreateAccount;
