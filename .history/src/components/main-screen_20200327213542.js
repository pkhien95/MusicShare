import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import HomeTab from '../components/tab-navigation/home';
import SearchTab from '../components/tab-navigation/search';
import AddMediaTab from '../components/tab-navigation/add-media';
import LikesTab from '../components/tab-navigation/likes';
import ProfileTab from '../components/tab-navigation/profile';

import { TabNavigator } from 'react-navigation';
import { Icon } from 'native-base';

class MainScreen extends Component {
  static navigationOptions = {
    headerLeft: <Icon name="ios-camera-outline" style={{ paddingLeft: 10 }} />,
    title: 'Instagram',
    headerRight: <Icon style={{ paddingRight: 10 }} name="ios-send-outline" />,
  };

  render() {
    return <AppTabNavigator />;
  }
}
export default MainScreen;

const AppTabNavigator = TabNavigator(
  {
    HomeTab: {
      screen: HomeTab,
    },
    SearchTab: {
      screen: SearchTab,
    },
    AddMediaTab: {
      screen: AddMediaTab,
    },
    LikesTab: {
      screen: LikesTab,
    },
    ProfileTab: {
      screen: ProfileTab,
    },
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      style: {
        ...Platform.select({
          android: {
            backgroundColor: 'white',
          },
        }),
      },
      activeTintColor: '#000',
      inactiveTintColor: '#d1cece',
      showLabel: false,
      showIcon: true,
    },
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
