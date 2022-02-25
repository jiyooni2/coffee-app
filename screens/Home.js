import React, { useState } from "react";
import styled from "styled-components/native";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { FlatList, View } from "react-native";
import { ActivityIndicator } from "react-native";
import Shop from "../components/Shop";

const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: black;
`;
const Logo = styled.Image`
  max-width: 50%;
  width: 100%;
  height: 100px;
  margin-bottom: 20px;
`;

const Text = styled.Text`
  color: white;
  font-size: 50px;
`;

const SEE_COFFEE_SHOPS_QUERY = gql`
  query ($offset: Int!) {
    seeCoffeeShops(offset: $offset) {
      id
      name
      latitude
      longitude
      user {
        username
        avatarUrl
      }
      categories {
        name
      }
      photos {
        url
      }
    }
  }
`;

function Home() {
  const { data, loading, refetch, fetchMore } = useQuery(
    SEE_COFFEE_SHOPS_QUERY,
    {
      variables: { offset: 0 },
    }
  );

  console.log(data);
  const [refreshing, setRefreshing] = useState(false);

  const renderShop = ({ item }) => {
    return <Shop {...item} />;
  };

  return (
    <Container>
      <Logo resizeMode="contain" source={require("../assets/logo.png")} />
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <FlatList
          onEndReached={() =>
            fetchMore({ variables: { offset: data?.seeCoffeeShops?.length } })
          }
          onEndReachedThreshold={0.05}
          onRefresh={() => {
            setRefreshing(true);
            refetch();
            setRefreshing(false);
          }}
          refreshing={refreshing}
          style={{ width: "100%", backgroundColor: "red" }}
          data={data?.seeCoffeeShops}
          keyExtractor={(shop) => "" + shop.id}
          renderItem={renderShop}
        ></FlatList>
      )}
    </Container>
  );
}

export default Home;
