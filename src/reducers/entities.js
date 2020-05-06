import * as SearchActionTypes from '../features/search/actions/action-types'
import * as AlbumDetailsActionTypes from '../features/album-details/actions/action-types'
import * as ArtistDetailsActionTypes from '../features/artist-details/actions/action-types'
import update from 'immutability-helper'
import { normalize } from 'normalizr'
import { albumSchema, artistSchema, trackSchema } from '../schemas'
import { merge } from 'lodash'
import '../utils/immutablility-helper'

const initialState = {
  albums: {},
  artists: {},
  tracks: {},
}

const handleSpotifySearchSuccess = (state, action) => {
  const { artists, albums } = action.payload
  const normalizedAlbums = normalize(albums, [albumSchema])
  const normalizedArtists = normalize(artists, [artistSchema])

  return update(state, {
    albums: {
      $deepMerge: normalizedAlbums.entities.albums || {},
    },
    artists: {
      $deepMerge: merge(
        normalizedAlbums.entities.artists || {},
        normalizedArtists.entities.artists || {},
      ),
    },
  })
}

const handleSpotifyGetAlbumDetailsSuccess = (state, action) => {
  const { result } = action.payload
  const normalizedAlbums = normalize(result, albumSchema)

  return update(state, {
    albums: {
      $deepMerge: normalizedAlbums.entities.albums || {},
    },
    artists: {
      $deepMerge: normalizedAlbums.entities.artists || {},
    },
    tracks: {
      $deepMerge: normalizedAlbums.entities.tracks || {},
    },
  })
}

const handleSpotifyGetArtistTopTracksSuccess = (state, action) => {
  const { result } = action.payload
  const normalizedAlbums = normalize(result, [trackSchema])

  return update(state, {
    artists: {
      $deepMerge: normalizedAlbums.entities.artists || {},
    },
    tracks: {
      $deepMerge: normalizedAlbums.entities.tracks || {},
    },
  })
}

const entitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SearchActionTypes.SPOTIFY_SEARCH_SUCCESS:
      return handleSpotifySearchSuccess(state, action)

    case AlbumDetailsActionTypes.GET_ALBUM_DETAILS_SUCCESS:
      return handleSpotifyGetAlbumDetailsSuccess(state, action)

    case ArtistDetailsActionTypes.GET_ARTIST_TOP_TRACKS_SUCCESS:
      return handleSpotifyGetArtistTopTracksSuccess(state, action)

    default:
      return state
  }
}

export default entitiesReducer
