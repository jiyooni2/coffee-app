import React, { useState } from "react";
import styled from "styled-components/native";
import Welcome from "./Welcome";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { isLoggedInVar, logUserOut, usernameVar } from "./../apollo";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { gql } from "@apollo/client";
import { ActivityIndicator, Image } from "react-native";
import AuthButton from "./../components/auth/AuthButton";
import colors from "../colors";

const Button = styled.TouchableOpacity`
  background-color: ${colors.blue};
  padding: 10px;
  margin: 10px;
  border-radius: 3px;
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  text-align: center;
`;

function FollowBtn({ onPress, disabled, text, loading }) {
  return (
    <Button disabled={disabled} onPress={onPress}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <ButtonText>{text}</ButtonText>
      )}
    </Button>
  );
}

const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: black;
`;

const Follow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-items: center;
`;

const FollowBtnContainer = styled.View`
  flex-direction: row;
  width: 90px;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  color: white;
  font-size: 20px;
`;
const Info = styled.Text`
  margin-top: 20px;
  color: white;
  font-size: 20px;
`;

const LogoutContainer = styled.View`
  padding-top: 10px;
`;

const SEE_USER_QUERY = gql`
  query ($username: String!) {
    seeUser(username: $username) {
      id
      username
      location
      email
      name
      totalFollowers
      totalFollowing
      avatarUrl
    }
  }
`;

const FOLLOW_USER_MUTATION = gql`
  mutation ($username: String!) {
    followUser(username: $username) {
      ok
      error
    }
  }
`;

const UNFOLLOW_USER_MUTATION = gql`
  mutation ($username: String!) {
    unfollowUser(username: $username) {
      ok
      error
    }
  }
`;

const IS_FOLLOWING_QUERY = gql`
  query ($username: String!) {
    isFollowing(username: $username) {
      ok
      isFollowing
    }
  }
`;

const Stack = createStackNavigator();

function Profile({ route }) {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const [isFollowing, setIsFollowing] = useState(false);
  const [totalFollowing, setTotalFollowing] = useState(0);
  const [totalFollowers, setTotalFollowers] = useState(0);

  const username =
    route.params === undefined
      ? useReactiveVar(usernameVar)
      : route.params.username;

  const { data, loading } = useQuery(SEE_USER_QUERY, {
    variables: {
      username,
    },
    onCompleted: (data) => {
      setTotalFollowers(data?.seeUser?.totalFollowers);
      setTotalFollowing(data?.seeUser?.totalFollowing);
    },
  });

  const { data: isFollowingData, isFollowingLoading } = useQuery(
    IS_FOLLOWING_QUERY,
    {
      variables: {
        username,
      },
      onCompleted: (data) => setIsFollowing(data.isFollowing?.isFollowing),
    }
  );

  const [followUserMutation, { data: followData, loading: followLoading }] =
    useMutation(FOLLOW_USER_MUTATION, {
      onCompleted: () => {
        setTotalFollowers((current) => current + 1);
        setIsFollowing(true);
      },
    });

  const [unFollowUserMutation, { loading: unFollowLoading }] = useMutation(
    UNFOLLOW_USER_MUTATION,
    {
      onCompleted: () => {
        setTotalFollowers((current) => current - 1);
        setIsFollowing(false);
      },
    }
  );

  return isLoggedIn ? (
    <Container>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <>
          <Image
            source={{ uri: data?.seeUser?.avatarUrl }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />

          <FollowBtnContainer>
            <FollowBtn
              disabled={isFollowing || !isLoggedIn}
              loading={followLoading}
              text="follow"
              onPress={() => {
                followUserMutation({ variables: { username } });
              }}
            />
            <FollowBtn
              disabled={!isFollowing && !isLoggedIn}
              loading={unFollowLoading}
              text="unfollow"
              onPress={() => {
                unFollowUserMutation({ variables: { username } });
              }}
            />
          </FollowBtnContainer>

          <Info>{data?.seeUser?.username}</Info>
          <Follow>
            <Info>{totalFollowers} Follower |</Info>
            <Info> {totalFollowing} Following</Info>
          </Follow>
          <Info>{data?.seeUser?.location}</Info>
          <Info>{data?.seeUser?.name}</Info>
        </>
      )}

      <LogoutContainer>
        <AuthButton
          onPress={logUserOut}
          disabled={false}
          loading={false}
          text="Logout"
        />
      </LogoutContainer>
    </Container>
  ) : (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,

        headerBackTitleVisible: false,
        headerTitle: () => false,
        headerTransparent: true,
        headerTintColor: "white",
      }}
      initialRouteName="Welcome"
    >
      <Stack.Screen
        name="Welcome"
        options={{ headerShown: false }}
        component={Welcome}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
    </Stack.Navigator>
  );
}

export default Profile;
