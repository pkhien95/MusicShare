import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootNavigator from './src/navigation'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './src/store'
import { bootstrapApplicationStart } from './src/sagas/actions'
import { BottomActionSheet } from './src/features/bottom-actions-sheet'
import { Toast } from './src/features/toast'
import {
  auth as SpotifyAuth,
  remote as SpotifyRemote,
  ApiScope,
  ApiConfig
} from 'react-native-spotify-remote';

export default function App() {
  useEffect(() => {
    store.dispatch(bootstrapApplicationStart())
  
  //   const spotifyConfig: ApiConfig = {
  //     clientID: "c81829338e324b9ebd3169647d1d6482",
  //     redirectURL: "com.theuimachine.music:/callback",
  //     tokenRefreshURL: "http://192.168.0.104:3001/refresh",
  //     tokenSwapURL: "http://192.168.0.104:3001/swap",
  //     scope: ApiScope.AppRemoteControlScope | ApiScope.UserFollowReadScope
  //   }
  //
  //   SpotifyAuth.initialize(spotifyConfig)
  //     .then(token => {
  //       console.log(token)
  //     })
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RootNavigator />
          <BottomActionSheet />
          <Toast />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}
