import React from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import MainScreen from './src/components/main-screen';

export default class App extends React.Component {
  render() {
    return <AppStackNavigator />;
  }
}

const AppStackNavigator = StackNavigator({
  Main: {
    screen: MainScreen,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
