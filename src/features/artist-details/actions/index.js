import * as ActionTypes from './action-types'

export const getArtistTopTracksRequest = (id: string) => ({
  type: ActionTypes.GET_ARTIST_TOP_TRACKS_REQUEST,
  payload: { id },
})

export const getArtistTopTracksSuccess = (result: *) => ({
  type: ActionTypes.GET_ARTIST_TOP_TRACKS_SUCCESS,
  payload: { result },
})

export const getArtistTopTracksFailure = (error: *) => ({
  type: ActionTypes.GET_ARTIST_TOP_TRACKS_FAILURE,
  payload: { error },
})
