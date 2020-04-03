import * as ActionTypes from '../actions/action-types'
import { normalize } from 'normalizr'
import { albumSchema, artistSchema } from '../../../schemas'
import update from 'immutability-helper'

const initialState = {
  artistIds: [],
  albumIds: [],
  error: {},
}

const handleSearchSuccess = (state, action) => {
  const { artists, albums } = action.payload
  const normalizedAlbums = normalize(albums, [albumSchema])
  const normalizedArtists = normalize(artists, [artistSchema])

  return update(state, {
    artistIds: {
      $set: normalizedArtists.result,
    },
    albumIds: {
      $set: normalizedAlbums.result,
    },
  })
}

const handleSearchFailure = (state, action) => {
  return update({
    error: {
      $set: action.payload.error,
    },
  })
}

const handleSearchReset = () => {
  return initialState
}

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SPOTIFY_SEARCH_SUCCESS:
      return handleSearchSuccess(state, action)
    case ActionTypes.SPOTIFY_SEARCH_FAILURE:
      return handleSearchFailure(state, action)
    case ActionTypes.SEARCH_RESET:
      return handleSearchReset()
    default:
      return state
  }
}

export default searchReducer
