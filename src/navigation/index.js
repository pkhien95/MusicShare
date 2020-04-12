import { createStackNavigator } from '@react-navigation/stack'
import BottomTabNavigator from './BottomTabNavigator'
import React from 'react'
import NAVIGATORS from '../constants/navigators'
import { AlbumDetailsScreen } from '../features/album-details'
import { ArtistDetailsScreen } from '../features/artist-details'

const Stack = createStackNavigator()

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NAVIGATORS.main}
        component={BottomTabNavigator}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name={NAVIGATORS.albumDetails}
        component={AlbumDetailsScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name={NAVIGATORS.artistDetails}
        component={ArtistDetailsScreen}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  )
}

export default RootNavigator
