import moment from 'moment'

export const isSpotifyTokenValid = spotifyAuth => {
  const { accessTokenExpirationDate } = spotifyAuth

  return moment(accessTokenExpirationDate).isSameOrAfter(moment())
}
