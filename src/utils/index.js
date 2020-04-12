import moment from 'moment'
import { isEmpty } from 'lodash'

export const isSpotifyTokenValid = spotifyAuth => {
  const { accessTokenExpirationDate } = spotifyAuth

  return moment(accessTokenExpirationDate).isSameOrAfter(moment())
}

export const getArtistsNamesFromList = (artists: Array<any>) => {
  return artists.reduce((prev, cur, index) => {
    const { name } = cur
    if (!isEmpty(name)) {
      prev += index > 0 ? `, ${name}` : name
    }
    return prev
  }, '')
}
