import { createStackNavigator } from '@react-navigation/stack'
import NAVIGATORS from '../constants/navigators'
import React from 'react'
import { ProfileScreen } from '../features/profile'
import { DEFAULT_OPTIONS } from '../theme/navigators'

const ProfileStack = createStackNavigator()

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name={NAVIGATORS.profile}
        component={ProfileScreen}
        options={DEFAULT_OPTIONS}
      />
    </ProfileStack.Navigator>
  )
}

export default ProfileStackNavigator
