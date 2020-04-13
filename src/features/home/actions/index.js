import * as ActionTypes from './action-types'

export const addNewAlbumRequest = (id: string) => ({
  type: ActionTypes.HOME_ADD_NEW_ALBUM_REQUEST,
  payload: { id },
})

export const addNewAlbumSuccess = (result: any) => ({
  type: ActionTypes.HOME_ADD_NEW_ALBUM_SUCCESS,
  payload: { result },
})

export const addNewAlbumFailure = (error: any) => ({
  type: ActionTypes.HOME_ADD_NEW_ALBUM_FAILURE,
  payload: { error },
})

export const addNewTrackRequest = (id: string) => ({
  type: ActionTypes.HOME_ADD_NEW_TRACK_REQUEST,
  payload: { id },
})

export const addNewTrackSuccess = (result: any) => ({
  type: ActionTypes.HOME_ADD_NEW_TRACK_SUCCESS,
  payload: { result },
})

export const addNewTrackFailure = (error: any) => ({
  type: ActionTypes.HOME_ADD_NEW_TRACK_FAILURE,
  payload: { error },
})
