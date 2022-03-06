import { gql, useQuery } from "@apollo/client";
import { ScrollView } from "react-native";
import Shop from "./../components/Shop";

const SEE_COFFEE_SHOP_QUERY = gql`
  query ($id: Int!) {
    seeCoffeeShop(id: $id) {
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

function ShopScreen({ route }) {
  const { data, loading } = useQuery(SEE_COFFEE_SHOP_QUERY, {
    variables: {
      id: route?.params?.shopId,
    },
  });

  console.log(data);
  console.log(route);
  return (
    <ScrollView
      style={{ backgroundColor: "black" }}
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "black",
      }}
    >
      {loading ? null : <Shop {...data?.seeCoffeeShop} />}
    </ScrollView>
  );
}

export default ShopScreen;
