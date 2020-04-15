import {
  BOOTSTRAP_APPLICATION_COMPLETE,
  BOOTSTRAP_APPLICATION_START,
} from '../sagas/actions/action-types'
import update from 'immutability-helper'

const initialState = {
  bootstrapped: false,
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

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOTSTRAP_APPLICATION_START:
      return handleBoostrapAppStart(state, action)

    case BOOTSTRAP_APPLICATION_COMPLETE:
      return handleBoostrapAppComplete(state, action)

    default:
      return state
  }
}

export default appReducer
