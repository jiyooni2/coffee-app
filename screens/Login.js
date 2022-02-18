import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { isLoggedInVar, logUserIn } from "../apollo";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

const LOG_IN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

function Login({ route: { params } }) {
  const { register, handleSubmit, setValue, watch, getValues } = useForm({
    defaultValues: {
      password: params?.password,
      username: params?.username,
    },
  });

  const passwordRef = useRef();

  const onCompleted = async (data) => {
    const { username } = getValues();
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      await logUserIn(token, username);
    }
  };

  const [logInMutation, { loading }] = useMutation(LOG_IN_MUTATION, {
    onCompleted,
  });

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  const onValid = (data) => {
    if (!loading) {
      logInMutation({
        variables: { ...data },
      });
    }
  };

  useEffect(() => {
    register("username", { required: true });
    register("password", { required: true });
  }, []);

  return (
    <AuthLayout>
      <TextInput
        value={watch("username")}
        onSubmitEditing={() => onNext(passwordRef)}
        placeholder="Username"
        returnKeyType="next"
        blurOnSubmit={false}
        placeholderTextColor={"rgba(255,255,255,0.8)"}
        onChangeText={(text) => setValue("username", text)}
      />
      <TextInput
        ref={passwordRef}
        value={watch("password")}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor={"rgba(255,255,255,0.8)"}
        returnKeyType="done"
        lastOne={true}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue("password", text)}
      />
      <AuthButton
        text="Log in"
        loading={loading}
        disabled={!watch("username") || !watch("password")}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}

export default Login;
