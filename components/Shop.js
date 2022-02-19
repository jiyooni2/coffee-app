import PropTypes from "prop-types";
import styled from "styled-components/native";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const View = styled.View`
  align-items: center;
  justify-content: center;
  background-color: blue;
  margin-bottom: 20px;
`;

const Text = styled.Text`
  margin-bottom: 20px;
  color: white;
  font-weight: 500;
  font-size: 20px;
`;

function Shop({ id, latitude, longitude, name, user, categories, photos }) {
  console.log(categories);
  return (
    <View>
      <Text>id: {id}</Text>
      <Text>latitude: {latitude}</Text>
      <Text>longitude: {longitude}</Text>
      <Text>name: {name}</Text>
      <Text>owner: {user.username}</Text>
      <View>
        {categories.map((category) => (
          <Text>{category.name}</Text>
        ))}
      </View>
      <Text>img: {photos[0]?.url}</Text>
    </View>
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
