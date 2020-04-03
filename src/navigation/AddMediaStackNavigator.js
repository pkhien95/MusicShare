import { createStackNavigator } from '@react-navigation/stack'
import NAVIGATORS from '../constants/navigators'
import React from 'react'
import { AddMediaScreen } from '../features/add-media'
import { DEFAULT_OPTIONS } from '../theme/navigators'

const AddMediaStack = createStackNavigator()

function AddMediaStackNavigator() {
  return (
    <AddMediaStack.Navigator>
      <AddMediaStack.Screen
        name={NAVIGATORS.addMedia}
        component={AddMediaScreen}
        options={DEFAULT_OPTIONS}
      />
    </AddMediaStack.Navigator>
  )
}

export default AddMediaStackNavigator
