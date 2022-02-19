import React from "react";
import styled from "styled-components/native";
import { gql, NetworkStatus } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { Text } from "react-native";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import colors from "../colors";
import { ActivityIndicator } from "react-native";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { Result, ResultText } from "./../components/result/Result";

const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: black;
`;

const SEARCH_USERS_QUERY = gql`
  query ($keyword: String!) {
    searchUsers(keyword: $keyword) {
      ok
      users {
        id
        username
        email
        name
        totalFollowing
        totalFollowers
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

function Search() {
  const { data, refetch, networkStatus } = useQuery(SEARCH_USERS_QUERY, {
    enabled: false,
    notifyOnNetworkStatusChange: true,
  });

  const { register, handleSubmit, setValue, getValues, watch } = useForm();

  const onValid = (data) => {
    const { keyword } = data;
    refetch({ keyword: keyword });
  };

  console.log(data);
  useEffect(() => {
    register("keyword", { required: true });
  }, [register]);

  return (
    <Container>
      <TextInput
        placeholder="Keyword"
        onChangeText={(text) => setValue("keyword", text)}
      ></TextInput>

      <SearchButton
        onPress={handleSubmit(onValid)}
        disabled={!watch("keyword") || networkStatus == NetworkStatus.refetch}
      >
        {networkStatus == NetworkStatus.refetch ? (
          <ActivityIndicator color="white" />
        ) : (
          <SearchText>Search</SearchText>
        )}
      </SearchButton>
      <Result>
        {data?.searchUsers?.users?.map((user) => (
          <ResultText key={user.id}>Username : {user.username}</ResultText>
        ))}
      </Result>
    </Container>
  );
}

export default Search;
