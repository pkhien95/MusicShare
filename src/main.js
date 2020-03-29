/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeTab from './components/tab-navigation/home';
import SearchTab from './components/tab-navigation/search';
import AddMediaTab from './components/tab-navigation/add-media';
// import MainScreen from './components/main-screen';
import LikesTab from './components/tab-navigation/likes';
import ProfileTab from './components/tab-navigation/profile';

const Tab = createBottomTabNavigator();

function Main() {
  return (
    <Tab.Navigator
      tabBarOptions={{
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
      }}>
      <Tab.Screen
        name="Home"
        component={HomeTab}
        options={{
          tabBarIcon: ({ tintColor }) => (
            <Ionicons size={24} name="ios-home" style={{ color: tintColor }} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchTab}
        options={{
          tabBarIcon: ({ tintColor }) => (
            <Ionicons
              size={24}
              name="ios-search"
              style={{ color: tintColor }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Add Media"
        component={AddMediaTab}
        options={{
          tabBarIcon: ({ tintColor }) => (
            <Ionicons
              size={24}
              name="ios-add-circle"
              style={{ color: tintColor }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Likes"
        component={LikesTab}
        options={{
          tabBarIcon: ({ tintColor }) => (
            <Ionicons size={24} name="ios-heart" style={{ color: tintColor }} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileTab}
        options={{
          tabBarIcon: ({ tintColor }) => (
            <Ionicons
              size={24}
              name="ios-person"
              style={{ color: tintColor }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Main;
