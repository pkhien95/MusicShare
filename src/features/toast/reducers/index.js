import * as ActionTypes from '../actions/action-types'
import update from 'immutability-helper'
import { ToastType } from '../constants'

const initialState = {
  isShowing: false,
  type: ToastType.INFO,
  message: '',
}

const handleShow = (state, action) => {
  const { type, message } = action.payload
  return update(state, {
    isShowing: { $set: true },
    type: { $set: type },
    message: { $set: message },
  })
}

const handleHide = state => {
  return initialState
}

const toastReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_TOAST:
      return handleShow(state, action)
    case ActionTypes.HIDE_TOAST:
      return handleHide(state)
    default:
      return state
  }
}

export default toastReducer
