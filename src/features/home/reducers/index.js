import * as ActionTypes from '../actions/action-types'
import update from 'immutability-helper'
import { HOME_SCREEN_ITEM_TYPE } from '../constants'

const initialState = []

const handleAddNewTrack = (state, action) => {
  const { id } = action.payload.result
  return update(state, {
    $push: [
      {
        type: HOME_SCREEN_ITEM_TYPE.TRACK,
        id,
      },
    ],
  })
}

const handleAddNewAlbum = (state, action) => {
  const { id } = action.payload.result
  return update(state, {
    $push: [
      {
        type: HOME_SCREEN_ITEM_TYPE.ALBUM,
        id,
      },
    ],
  })
}

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.HOME_ADD_NEW_ALBUM_SUCCESS:
      return handleAddNewAlbum(state, action)

    case ActionTypes.HOME_ADD_NEW_TRACK_SUCCESS:
      return handleAddNewTrack(state, action)

    default:
      return state
  }
}

export default homeReducer
