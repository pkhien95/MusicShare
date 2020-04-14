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
import NavigationService from './src/service/navigation'

export default function App() {
  useEffect(() => {
    store.dispatch(bootstrapApplicationStart())
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={NavigationService.navigatorRef}>
          <RootNavigator />
          <BottomActionSheet />
          <Toast />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}
