import * as SearchActionTypes from '../features/search/actions/action-types'
import update from 'immutability-helper'
import { normalize } from 'normalizr'
import { albumSchema, artistSchema } from '../schemas'
import { merge } from 'lodash'

const initialState = {
  albums: {},
  artists: {},
}

const handleSpotifySearchSuccess = (state, action) => {
  const { artists, albums } = action.payload
  const normalizedAlbums = normalize(albums, [albumSchema])
  const normalizedArtists = normalize(artists, [artistSchema])
  console.log(normalizedAlbums)
  return update(state, {
    albums: {
      $merge: normalizedAlbums.entities.albums || {},
    },
    artists: {
      $merge: merge(
        normalizedAlbums.entities.artists || {},
        normalizedArtists.entities.artists || {},
      ),
    },
  })
}

const entitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SearchActionTypes.SPOTIFY_SEARCH_SUCCESS:
      return handleSpotifySearchSuccess(state, action)
    default:
      return state
  }
}

export default entitiesReducer
