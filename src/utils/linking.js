import { Linking } from 'react-native'

export const openInSpotify = url => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url)
    }
  })
}

export const openInAppleMusic = url => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url)
    }
  })
}
