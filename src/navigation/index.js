import { createStackNavigator } from '@react-navigation/stack'
import BottomTabNavigator from './BottomTabNavigator'
import React, { useCallback, useEffect, useState } from 'react'
import NAVIGATORS from '../constants/navigators'
import { AlbumDetailsScreen } from '../features/album-details'
import { ArtistDetailsScreen } from '../features/artist-details'
import { useSelector } from 'react-redux'
import { BootstrapScreen } from '../features/boostrap'
import { store } from '../store'
import { checkSpotifyAuth } from '../sagas/actions'
import { AppState } from 'react-native'

const Stack = createStackNavigator()

function RootNavigator() {
  const bootstrapped = useSelector(state => state.app.bootstrapped)
  const session = useSelector(state => state.spotify.auth)

  const [appState, setAppState] = useState('active')

  const handleAppStateChange = useCallback(
    nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        store.dispatch(checkSpotifyAuth())
      } else {
        // if (!isEmpty(session)) {
        //   store.dispatch(disconnectSpotifyRemote())
        // }
      }
      setAppState(nextAppState)
    },
    [bootstrapped, appState, session],
  )

  useEffect(() => {
    if (bootstrapped) {
      AppState.addEventListener('change', handleAppStateChange)

      return () => {
        AppState.removeEventListener('change', handleAppStateChange)
      }
    }
  }, [bootstrapped, handleAppStateChange])

  if (!bootstrapped) {
    return <BootstrapScreen />
  }

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
