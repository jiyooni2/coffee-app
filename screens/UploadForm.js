import React, { useEffect, useRef } from "react";
import { useWindowDimensions, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "./../components/DismissKeyboard";
import { useForm } from "react-hook-form";
import colors from "../colors";
import { gql, useMutation } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client";
import { TouchableOpacity } from "react-native-gesture-handler";
import mime from "mime";
import AuthButton from "./../components/auth/AuthButton";
import { KeyboardAvoidingView } from "react-native";
import { TextInput } from "../components/auth/AuthShared";

const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: black;
  padding: 0px 40px;
`;

const Photo = styled.Image``;

const InputContainer = styled.View`
  margin-top: 20px;
  padding: 0px 10px;
  flex: 1;
  align-items: center;
  width: 100%;
`;

const CREATE_COFFEE_SHOP_MUTATION = gql`
  mutation (
    $name: String!
    $latitude: String!
    $longitude: String!
    $category: String!
    $photo: Upload
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      category: $category
      photo: $photo
    ) {
      ok
      error
    }
  }
`;

export default function UploadForm({ route, navigation }) {
  const onCompleted = () => {
    navigation.navigate("Tabs");
  };

  const [createCoffeeShopMutation, { data, loading, error }] = useMutation(
    CREATE_COFFEE_SHOP_MUTATION,
    { onCompleted }
  );

  const { width, height } = useWindowDimensions();
  const { register, handleSubmit, setValue, watch } = useForm();

  useEffect(() => {
    register("category", { required: true });
    register("name", { required: true });
    register("latitude", { required: true });
    register("longitude", { required: true });
  }, [register]);

  console.log(data, error);

  const onValid = ({ latitude, longitude, category, name }) => {
    const photo = new ReactNativeFile({
      uri: route.params.file,
      name: `${name}.jpg`,
      type: mime.getType(route.params.file),
    });

    console.log(photo);

    //ReactNativeFile 객체를 보내면 network error
    createCoffeeShopMutation({
      variables: { name, latitude, longitude, category, photo },
    });
  };

  const latitudeRef = useRef();
  const longitudeRef = useRef();
  const categoryRef = useRef();

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset="20"
        style={{ flex: 1 }}
      >
        <Container>
          <Photo
            resizeMode="contain"
            source={{ uri: route.params.file }}
            style={{ width, height: 200 }}
          />
          <InputContainer>
            <TextInput
              autoFocus
              onSubmitEditing={() => onNext(latitudeRef)}
              placeholder="name"
              onChangeText={(text) => setValue("name", text)}
              blurOnSubmit={false}
              returnKeyType="next"
              placeholderTextColor={"rgba(255,255,255,0.8)"}
            ></TextInput>
            <TextInput
              ref={latitudeRef}
              onSubmitEditing={() => onNext(longitudeRef)}
              placeholder="latitude"
              onChangeText={(text) => setValue("latitude", text)}
              blurOnSubmit={false}
              returnKeyType="next"
              placeholderTextColor={"rgba(255,255,255,0.8)"}
            ></TextInput>
            <TextInput
              ref={longitudeRef}
              onSubmitEditing={() => onNext(categoryRef)}
              placeholder="longitude"
              onChangeText={(text) => setValue("longitude", text)}
              blurOnSubmit={false}
              returnKeyType="next"
              placeholderTextColor={"rgba(255,255,255,0.8)"}
            ></TextInput>
            <TextInput
              ref={categoryRef}
              placeholder="category"
              onChangeText={(text) => setValue("category", text)}
              blurOnSubmit={false}
              returnKeyType="done"
              onSubmitEditing={handleSubmit(onValid)}
              placeholderTextColor={"rgba(255,255,255,0.8)"}
            ></TextInput>

            <AuthButton
              disabled={
                !watch("name") ||
                !watch("category") ||
                !watch("longitude") ||
                !watch("latitude")
              }
              onPress={handleSubmit(onValid)}
              loading={loading}
              text="Create Coffee Shop"
            ></AuthButton>
          </InputContainer>
        </Container>
      </KeyboardAvoidingView>
    </DismissKeyboard>
  );
}
