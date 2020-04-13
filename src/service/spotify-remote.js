import { remote } from 'react-native-spotify-remote'

export const connect = (accessToken: string) => {
  return remote.connect(accessToken)
}

export const playUri = (uri: string) => {
  return remote.playUri(uri)
}

export const pause = () => remote.pause()
