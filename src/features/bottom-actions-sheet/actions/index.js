import * as ActionTypes from './action-types'

export const showBottomActionSheet = (actions: Array<any>) => ({
  type: ActionTypes.SHOW_BOTTOM_ACTION_SHEET,
  payload: { actions },
})

export const hideBottomActionSheet = () => ({
  type: ActionTypes.HIDE_BOTTOM_ACTION_SHEET,
})
