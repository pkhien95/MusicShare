import * as ActionTypes from '../actions/action-types'
import update from 'immutability-helper'

const initialState = {
  isShowing: false,
  actions: [],
}

const handleShow = (state, action) => {
  const { actions } = action.payload
  return update(state, {
    isShowing: { $set: true },
    actions: { $set: actions },
  })
}

const handleHide = state => {
  return update(state, {
    isShowing: { $set: false },
    actions: { $set: [] },
  })
}

const bottomActionSheetReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_BOTTOM_ACTION_SHEET:
      return handleShow(state, action)
    case ActionTypes.HIDE_BOTTOM_ACTION_SHEET:
      return handleHide(state)
    default:
      return state
  }
}

export default bottomActionSheetReducer
