import * as ActionTypes from './action-types'

export const getAlbumDetailsRequest = (id: string) => ({
  type: ActionTypes.GET_ALBUM_DETAILS_REQUEST,
  payload: { id },
})

export const getAlbumDetailsSuccess = (result: *) => ({
  type: ActionTypes.GET_ALBUM_DETAILS_SUCCESS,
  payload: { result },
})

export const getAlbumDetailsFailure = (error: *) => ({
  type: ActionTypes.GET_ALBUM_DETAILS_FAILURE,
  payload: { error },
})
