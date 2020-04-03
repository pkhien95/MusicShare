import { createStackNavigator } from '@react-navigation/stack'
import NAVIGATORS from '../constants/navigators'
import React from 'react'
import { LikesScreen } from '../features/likes'
import { DEFAULT_OPTIONS } from '../theme/navigators'

const LikesStack = createStackNavigator()

function LikesStackNavigator() {
  return (
    <LikesStack.Navigator>
      <LikesStack.Screen
        name={NAVIGATORS.likes}
        component={LikesScreen}
        options={DEFAULT_OPTIONS}
      />
    </LikesStack.Navigator>
  )
}

export default LikesStackNavigator
