import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components/native";
import { Camera } from "expo-camera";
import { Alert, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useIsFocused } from "@react-navigation/native";
import { createAssetAsync, saveToLibraryAsync } from "expo-media-library";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Actions = styled.View`
  flex: 0.2;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 50px;
`;

const TakePhotoBtn = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  padding-left: auto;
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 50px;
`;

const ZoomContainer = styled.View`
  padding-top: 5px;
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const Button = styled.Button`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.8);
`;

const PhotoAction = styled.TouchableOpacity`
  background-color: white;
  padding: 5px 10px;
  border-radius: 4px;
`;
const PhotoActionText = styled.Text`
  font-weight: 600;
`;

function TakePhoto({ navigation }) {
  const [ok, setOk] = useState(false);
  const [takenPhoto, setTakenPhoto] = useState("");
  const [cameraReady, setCameraReady] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const isFocused = useIsFocused();
  const camera = useRef();

  const getPermissions = async () => {
    const { granted } = await Camera.requestCameraPermissionsAsync();
    setOk(granted); // granted===true, setOk(true)
  };

  useEffect(() => {
    getPermissions();
  }, []);

  const onCameraSwitch = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };

  const onFlashChanged = () => {
    if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.on);
    } else {
      setFlashMode(Camera.Constants.FlashMode.off);
    }
  };

  const onDismiss = () => {
    setTakenPhoto("");
  };

  const goToUpload = async (save) => {
    if (save) {
      await saveToLibraryAsync(takenPhoto);
    }

    //go to upload screen
    navigation.navigate("UploadForm", { file: takenPhoto });
  };

  const onUpload = () => {
    Alert.alert("Save Photo", "Save Photo and upload or just upload?", [
      {
        text: "Save and Upload",
        onPress: () => goToUpload(true),
      },
      {
        text: "Just Upload",
        onPress: () => goToUpload(false),
      },
    ]);
  };

  const takePhoto = async () => {
    if (camera.current && cameraReady) {
      const { uri } = await camera.current.takePictureAsync({
        quality: 1,
        exif: true,
        skipProcessing: true,
      });

      setTakenPhoto(uri);
    }
  };

  return (
    <Container>
      {isFocused ? <StatusBar hidden={true} /> : null}
      {isFocused ? (
        takenPhoto === "" ? (
          <Camera
            type={cameraType}
            style={{ flex: 1 }}
            flashMode={flashMode}
            ref={camera}
            zoom={zoom}
            onCameraReady={() => setCameraReady(true)}
          >
            <TouchableOpacity
              style={{ position: "absolute", left: 10, top: 20 }}
              onPress={() => navigation.navigate("Tabs")}
            >
              <Ionicons name="close" color="white" size={30} />
            </TouchableOpacity>
          </Camera>
        ) : (
          <Image source={{ uri: takenPhoto }} style={{ flex: 1 }} />
        )
      ) : null}
      {takenPhoto === "" ? (
        <>
          <ZoomContainer>
            <Button title="medium" onPress={() => setZoom(0.5)} />
            <Button title="default" onPress={() => setZoom(0)} />
            <Button title="max" onPress={() => setZoom(1)} />
          </ZoomContainer>
          <Actions>
            <TouchableOpacity onPress={onFlashChanged}>
              <Ionicons
                color="white"
                size={30}
                name={
                  flashMode === Camera.Constants.FlashMode.off
                    ? "flash"
                    : "flash-off"
                }
              />
            </TouchableOpacity>
            <TakePhotoBtn onPress={takePhoto} />
            <TouchableOpacity onPress={onCameraSwitch}>
              <Ionicons color="white" size={30} name="ios-camera-reverse" />
            </TouchableOpacity>
          </Actions>
        </>
      ) : (
        <Actions>
          <PhotoAction onPress={onDismiss}>
            <PhotoActionText>Dismiss</PhotoActionText>
          </PhotoAction>
          <PhotoAction onPress={onUpload}>
            <PhotoActionText>Upload</PhotoActionText>
          </PhotoAction>
        </Actions>
      )}
    </Container>
  );
}

export default TakePhoto;
