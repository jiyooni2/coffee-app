import PropTypes from "prop-types";
import styled from "styled-components/native";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { Image, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { usernameVar } from "./../apollo";

const Container = styled.View`
  justify-content: center;
  margin-bottom: 20px;
`;

const Header = styled.View`
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Avatar = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;

const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
`;
const Username = styled.Text`
  color: white;
  font-weight: 600;
`;

const Photo = styled.Image``;

const Text = styled.Text`
  margin-bottom: 20px;
  color: white;
  font-weight: 500;
  font-size: 20px;
`;

const DeleteBtn = styled.Button`
  background-color: red;
  padding: 10px;
  border-radius: 3px;
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

const DELETE_COFFEE_SHOP_MUTATION = gql`
  mutation ($id: Int!) {
    deleteCoffeeShop(id: $id) {
      ok
      error
    }
  }
`;

function Shop({ id, latitude, longitude, name, user, categories, photos }) {
  const username = useReactiveVar(usernameVar);
  const navigation = useNavigation();

  const [deleteCoffeeShopMutation, { loading: deleteLoading }] = useMutation(
    DELETE_COFFEE_SHOP_MUTATION
  );

  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState(300);

  useEffect(() => {
    if (photos[0].url) {
      Image.getSize(photos[0].url, (width, height) => {
        console.log("height", height, screenHeight);
        if (height > screenHeight - 100) {
          setImageHeight(screenHeight - 300);
        } else {
          setImageHeight(height);
        }
      });
    }
  }, []);

  return (
    <Container>
      <Header>
        <Avatar
          onPress={() =>
            navigation.navigate("ProfileScreen", { username: user?.username })
          }
        >
          <UserAvatar resizeMode="cover" source={{ uri: user?.avatarUrl }} />
          <Username>{user?.username}</Username>
        </Avatar>
        {username === user?.username ? (
          <DeleteBtn
            onPress={() => deleteCoffeeShopMutation({ variables: { id } })}
            title="Delete"
          ></DeleteBtn>
        ) : null}
      </Header>
      <Photo
        resizeMode="cover"
        source={{ uri: photos[0]?.url }}
        style={{
          width: screenWidth,
          height: imageHeight,
          backgroundColor: "black",
        }}
      ></Photo>
      <Text>{name}</Text>
      <Text>
        location: {latitude}, {longitude}
      </Text>
      <Text>{categories.map((category) => `#${category.name} `)}</Text>
    </Container>
  );
}

Shop.propTypes = {
  id: PropTypes.number.isRequired,
  latitude: PropTypes.string.isRequired,
  longitude: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  categories: PropTypes.array.isRequired,
  photos: PropTypes.array.isRequired,
};

export default Shop;
