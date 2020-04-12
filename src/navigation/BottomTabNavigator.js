import * as React from 'react'
import { Platform } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import SearchStackNavigator from './SearchStackNavigator'
import HomeStackNavigator from './HomeStackNavigator'
import AddMediaStackNavigator from './AddMediaStackNavigator'
import LikesStackNavigator from './LikesStackNavigator'
import ProfileStackNavigator from './ProfileStackNavigator'
import NAVIGATORS from '../constants/navigators'

const Tab = createBottomTabNavigator()

function BottomTabNavigator() {
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
        name={NAVIGATORS.home}
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ tintColor }) => (
            <Ionicons size={24} name="ios-home" style={{ color: tintColor }} />
          ),
        }}
      />
      <Tab.Screen
        name={NAVIGATORS.search}
        component={SearchStackNavigator}
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
        name={NAVIGATORS.addMedia}
        component={AddMediaStackNavigator}
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
        name={NAVIGATORS.likes}
        component={LikesStackNavigator}
        options={{
          tabBarIcon: ({ tintColor }) => (
            <Ionicons size={24} name="ios-heart" style={{ color: tintColor }} />
          ),
        }}
      />
      <Tab.Screen
        name={NAVIGATORS.profile}
        component={ProfileStackNavigator}
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
  )
}

export default BottomTabNavigator
