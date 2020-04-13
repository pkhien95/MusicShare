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
import COLORS from '../theme/colors'

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
        activeTintColor: COLORS.black,
        inactiveTintColor: COLORS.lightGrey,
        showLabel: false,
        showIcon: true,
      }}>
      <Tab.Screen
        name={NAVIGATORS.home}
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons size={24} name="ios-home" style={{ color }} />
          ),
        }}
      />
      <Tab.Screen
        name={NAVIGATORS.search}
        component={SearchStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons size={24} name="ios-search" style={{ color }} />
          ),
        }}
      />
      <Tab.Screen
        name={NAVIGATORS.addMedia}
        component={AddMediaStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons size={24} name="ios-add-circle" style={{ color }} />
          ),
        }}
      />
      <Tab.Screen
        name={NAVIGATORS.likes}
        component={LikesStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons size={24} name="ios-heart" style={{ color }} />
          ),
        }}
      />
      <Tab.Screen
        name={NAVIGATORS.profile}
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons size={24} name="ios-person" style={{ color }} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator
