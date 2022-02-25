import PropTypes from "prop-types";
import styled from "styled-components/native";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { Image, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  justify-content: center;
  background-color: blue;
  margin-bottom: 20px;
`;

const Header = styled.TouchableOpacity`
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

function Shop({ id, latitude, longitude, name, user, categories, photos }) {
  const navigation = useNavigation();

  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  console.log(user);
  return (
    <Container>
      <Header onPress={() => navigation.navigate("ProfileScreen")}>
        <UserAvatar resizeMode="cover" source={{ uri: user.avatarUrl }} />
        <Username>{user.username}</Username>
      </Header>
      <Photo
        resizeMode="cover"
        source={{ uri: photos[0]?.url }}
        style={{ width: screenWidth, height: 100 }}
      ></Photo>
      <Text>name: {name}</Text>
      <Text>latitude: {latitude}</Text>
      <Text>longitude: {longitude}</Text>
      <Text>owner: {user.username}</Text>
      <Text>{categories.map((category) => `#${category.name}`)}</Text>
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
  }),
  categories: PropTypes.array,
  photos: PropTypes.array,
};

export default Shop;
