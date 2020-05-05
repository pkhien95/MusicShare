import { ActionTypes } from '../sagas/actions'
import update from 'immutability-helper'

const initialState = {
  auth: {},
}

const spotifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTHORIZE_SPOTIFY_SUCCESS:
      return update(state, {
        auth: {
          $set: action.payload.result,
        },
      })
    case ActionTypes.REFRESH_SPOTIFY_SUCCESS:
      return update(state, {
        auth: {
          $set: action.payload.result,
        },
      })
    case ActionTypes.DISCONNECT_SPOTIFY_REMOTE:
      return update(state, {
        auth: {
          $set: {},
        },
      })
    default:
      return state
  }
}

export default spotifyReducer
