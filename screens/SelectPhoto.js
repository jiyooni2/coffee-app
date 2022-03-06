import {
  getAlbumsAsync,
  getAssetsAsync,
  getPermissionsAsync,
  requestPermissionsAsync,
} from "expo-media-library";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, useWindowDimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../colors";
import { StatusBar } from "expo-status-bar";

const Container = styled.View`
  justify-content: center;
  flex: 1;
  background-color: black;
`;

const Top = styled.View`
  flex: 1;
  background-color: black;
`;

const Bottom = styled.View`
  flex: 1;
`;

const ImageContainer = styled.TouchableOpacity``;
const IconContainer = styled.View`
  position: absolute;
  bottom: 3px;
  right: 3px;
`;

const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 18px;
  padding-right: 8px;
  font-weight: 600;
`;

function SelectPhoto({ navigation }) {
  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [chosenPhoto, setChosenPhoto] = useState("");
  const { width, height } = useWindowDimensions();
  const numColumns = 4;

  const getPhotos = async () => {
    const { assets: photos } = await getAssetsAsync({
      sortBy: "creationTime",
      first: 200,
    });

    setPhotos(photos);
  };

  const getPermissions = async () => {
    const { granted, canAskAgain } = await getPermissionsAsync();

    if (!granted && canAskAgain) {
      const { granted } = await requestPermissionsAsync();
      if (granted) {
        setOk(true);
        getPhotos();
      }
    } else if (granted) {
      setOk(true);
      getPhotos();
    }
  };

  const HeaderRight = () => (
    <TouchableOpacity
      onPress={() => {
        if (chosenPhoto === "") {
          Alert.alert("Choose a photo");
        } else {
          return navigation.navigate("UploadForm", { file: chosenPhoto });
        }
      }}
    >
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );

  useEffect(() => {
    getPermissions();
  }, []);

  //chosenPhoto를 관찰해야만, Next에 파일 전달
  useEffect(() => {
    navigation.setOptions({ headerRight: HeaderRight });
  }, [chosenPhoto]);

  const choosePhoto = (uri) => {
    setChosenPhoto(uri);
  };

  const renderItem = ({ item: photo }) => (
    <ImageContainer onPress={() => choosePhoto(photo.uri)}>
      <Image
        source={{ uri: photo.uri }}
        style={{ width: width / numColumns, height: 50 }}
      />
      <IconContainer>
        <Ionicons
          name="checkmark-circle"
          size={18}
          color={photo.uri === chosenPhoto ? colors.blue : "white"}
        />
      </IconContainer>
    </ImageContainer>
  );

  return (
    <Container>
      <Top>
        {chosenPhoto !== "" ? (
          <Image
            source={{ uri: chosenPhoto }}
            style={{ width, height: "100%" }}
          />
        ) : null}
      </Top>
      <Bottom>
        <FlatList
          data={photos}
          keyExtractor={photos.id}
          numColumns={numColumns}
          renderItem={renderItem}
        />
      </Bottom>
    </Container>
  );
}

export default SelectPhoto;
