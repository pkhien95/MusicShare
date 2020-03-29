/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Main from './src/main';
import { doAuthentication } from './src/auth';
import Reactotron, {
  trackGlobalErrors,
  openInEditor,
  overlay,
  asyncStorage,
  networking,
} from 'reactotron-react-native';
import { NativeModules } from 'react-native';

let scriptHostname;
if (__DEV__) {
  const scriptURL = NativeModules.SourceCode.scriptURL;
  scriptHostname = scriptURL.split('://')[1].split(':')[0];
  Reactotron.configure({ host: scriptHostname })
    .use(trackGlobalErrors())
    .use(openInEditor())
    .use(overlay())
    .use(asyncStorage())
    .use(networking())
    .connect();
}

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
  useEffect(() => {
    // Create an scoped async function in the hook
    async function anyNameFunction() {
      await doAuthentication();
    }
    // Execute the created function directly
    anyNameFunction();
  }, []);
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
