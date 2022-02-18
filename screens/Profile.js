import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: black;
`;

const Text = styled.Text`
  color: white;
  font-size: 50px;
`;

function Profile() {
  return (
    <Container>
      <Text>Profile</Text>
    </Container>
  );
}

export default Profile;
