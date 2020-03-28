/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import * as React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Main from './src/main';

const config = {
  clientId: 'c81829338e324b9ebd3169647d1d6482', // available on the app page
  clientSecret: 'eafd64f9ca744f17a89df2399fd5f354', // click "show client secret" to see this
  redirectUrl: 'com.myapp:/oauth', // the redirect you defined after creating the app
  scopes: ['user-read-email', 'playlist-modify-public', 'user-read-private'], // the scopes you need to access
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  },
};

const sdfsd = async () => {
  const authState = await authorize(config);
};

const Stack = createStackNavigator();

function Title() {
  return <Text>Music To My Ears</Text>;
}
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          headerTintColor: 'white',
          headerLeft: () => (
            <Ionicons size={24} name="ios-camera" style={{ paddingLeft: 10 }} />
          ),
          headerTitle: () => <Title />,
          headerRight: () => (
            <Ionicons size={24} style={{ paddingRight: 10 }} name="ios-send" />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
