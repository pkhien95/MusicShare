import * as ActionTypes from './action-types'

export const selectSource = (source: string) => {
  return {
    type: ActionTypes.SELECT_SOURCE,
    payload: { source },
  }
}
