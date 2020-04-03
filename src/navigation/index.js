import { createStackNavigator } from '@react-navigation/stack'
import BottomTabNavigator from './BottomTabNavigator'
import React from 'react'
import NAVIGATORS from '../constants/navigators'

const Stack = createStackNavigator()

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NAVIGATORS.main}
        component={BottomTabNavigator}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  )
}

export default RootNavigator
