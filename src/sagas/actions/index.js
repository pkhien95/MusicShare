import * as ActionTypes from './action-types'

export { ActionTypes }

export const authSpotifyRequest = () => ({
  type: ActionTypes.AUTHORIZE_SPOTIFY_REQUEST,
})

export const authSpotifySuccess = result => ({
  type: ActionTypes.AUTHORIZE_SPOTIFY_SUCCESS,
  payload: {
    result,
  },
})

export const authSpotifyFailure = error => ({
  type: ActionTypes.AUTHORIZE_SPOTIFY_FAILURE,
  payload: {
    error,
  },
})

export const refreshSpotifyRequest = () => ({
  type: ActionTypes.REFRESH_SPOTIFY_REQUEST,
})

export const refreshSpotifySuccess = result => ({
  type: ActionTypes.REFRESH_SPOTIFY_SUCCESS,
  payload: {
    result,
  },
})

export const refreshSpotifyFailure = error => ({
  type: ActionTypes.REFRESH_SPOTIFY_FAILURE,
  payload: {
    error,
  },
})

export const rehydrationComplete = () => ({
  type: ActionTypes.REHYDRATION_COMPLETE,
})

export const bootstrapApplicationStart = () => ({
  type: ActionTypes.BOOTSTRAP_APPLICATION_START,
})

export const bootstrapApplicationComplete = () => ({
  type: ActionTypes.BOOTSTRAP_APPLICATION_COMPLETE,
})

export const spotifyReceiveEvent = (eventKey: string) => ({
  type: ActionTypes.SPOTIFY_RECEIVE_EVENT,
  payload: {
    event: eventKey,
  },
})
