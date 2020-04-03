import { createStackNavigator } from '@react-navigation/stack'
import NAVIGATORS from '../constants/navigators'
import React from 'react'
import { HomeScreen } from '../features/home'
import { DEFAULT_OPTIONS } from '../theme/navigators'

const HomeStack = createStackNavigator()

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={NAVIGATORS.home}
        component={HomeScreen}
        options={DEFAULT_OPTIONS}
      />
    </HomeStack.Navigator>
  )
}

export default HomeStackNavigator
