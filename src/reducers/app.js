import {
  BOOTSTRAP_APPLICATION_COMPLETE,
  BOOTSTRAP_APPLICATION_START,
} from '../sagas/actions/action-types'
import update from 'immutability-helper'
import * as ProfileActionTypes from '../features/profile/actions/action-types'
import { SOURCE } from '../constants'

const initialState = {
  bootstrapped: false,
  source: SOURCE.appleMusic,
}

const handleBoostrapAppStart = (state, action) => {
  return update(state, {
    bootstrapped: { $set: false },
  })
}

const handleBoostrapAppComplete = (state, action) => {
  return update(state, {
    bootstrapped: { $set: true },
  })
}

const handleSelectSource = (state, action) => {
  const { source } = action.payload
  return update(state, {
    source: { $set: source },
  })
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOTSTRAP_APPLICATION_START:
      return handleBoostrapAppStart(state, action)

    case BOOTSTRAP_APPLICATION_COMPLETE:
      return handleBoostrapAppComplete(state, action)

    case ProfileActionTypes.SELECT_SOURCE:
      return handleSelectSource(state, action)

    default:
      return state
  }
}

export default appReducer
