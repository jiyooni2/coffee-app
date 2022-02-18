import React from "react";
import styled from "styled-components/native";

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

function Home() {
  return (
    <Container>
      <Logo resizeMode="contain" source={require("../assets/logo.png")} />
      <Text>Home</Text>
    </Container>
  );
}

export default Home;
