import React from "react";
import styled from "styled-components/native";
import { gql, NetworkStatus } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";
import { FlatList, Text, TouchableOpacity, Image } from "react-native";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import colors from "../colors";
import { ActivityIndicator, useWindowDimensions } from "react-native";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { Result, ResultText } from "./../components/result/Result";
import DismissKeyboard from "../components/DismissKeyboard";

const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: black;
`;

const SEARCH_COFFEE_SHOPS_QUERY = gql`
  query ($keyword: String!) {
    searchCoffeeShops(keyword: $keyword) {
      id
      name
      photos {
        url
      }
    }
  }
`;

const TextInput = styled.TextInput`
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 0.15);
  padding: 4px 8px;
  width: 100%;
  color: white;
  margin-bottom: 8px;
  border-radius: 4px;
  margin-bottom: ${(props) => (props.lastOne ? "10px" : "5px")};
`;

const Input = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.7);
  width: ${(props) => props.width / 1.5 + "px"};
  color: black;
  padding: 3px 10px;
  border-radius: 10px;
`;

const SearchingContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
`;
const SearchingText = styled.Text`
  margin-top: 15px;
  color: white;
  font-weight: 600;
`;

const SearchButton = styled.TouchableOpacity`
  margin-bottom: 20px;
  background-color: ${colors.blue};
  padding: 10px;
  border-radius: 3px;
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

const SearchText = styled.Text`
  color: white;
  font-weight: 600;
  text-align: center;
`;

const SearchResult = styled.View`
  background-color: yellow;
  width: 100%;
  flex: 1;
`;

function Search({ navigation }) {
  const numColumns = 3;

  const { width } = useWindowDimensions();
  const [startQueryFn, { loading, data, called }] = useLazyQuery(
    SEARCH_COFFEE_SHOPS_QUERY
  );

  const { register, handleSubmit, setValue, getValues, watch } = useForm();

  const SearchBox = () => (
    <Input
      placeholderTextColor="rgba(0,0,0,0.8)"
      placeholder="Search Photos"
      autoCapitalize="none"
      returnKeyLabel="Search"
      returnKeyType="search"
      onChangeText={(text) => setValue("keyword", text)}
      autoCorrect={false}
      onSubmitEditing={handleSubmit(onValid)}
      width={width}
    />
  );
  const onValid = ({ keyword }) => {
    startQueryFn({ variables: { keyword } });
  };

  console.log(data);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword", { required: true });
  }, [register]);

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <Image
        source={{ uri: item.photos[0].url }}
        style={{ width: width / numColumns, height: 100 }}
      />
    </TouchableOpacity>
  );

  return (
    <DismissKeyboard>
      <Container>
        {loading ? (
          <SearchingContainer>
            <ActivityIndicator color="white" size="large" />
            <SearchingText>Searching...</SearchingText>
          </SearchingContainer>
        ) : !called ? (
          <SearchingContainer>
            <SearchingText>Search by keyword</SearchingText>
          </SearchingContainer>
        ) : !data?.searchCoffeeShops || data?.searchCoffeeShops.length === 0 ? (
          <SearchingContainer>
            <SearchingText>Could not find anything</SearchingText>
          </SearchingContainer>
        ) : (
          <FlatList
            numColumns={numColumns}
            style={{ width: "100%" }}
            data={data?.searchCoffeeShops}
            keyExtractor={(photo) => "" + photo.id}
            renderItem={renderItem}
          ></FlatList>
        )}
      </Container>
    </DismissKeyboard>
  );
}

export default Search;
