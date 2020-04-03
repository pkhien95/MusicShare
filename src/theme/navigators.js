import Ionicons from 'react-native-vector-icons/Ionicons'
import React from 'react'

export const DEFAULT_OPTIONS = {
  headerTintColor: 'black',
  headerLeft: () => (
    <Ionicons size={24} name="ios-camera" style={{ paddingLeft: 10 }} />
  ),
  title: 'Music to my ears',
  headerRight: () => (
    <Ionicons size={24} style={{ paddingRight: 10 }} name="ios-send" />
  ),
}
