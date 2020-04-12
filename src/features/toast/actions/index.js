import * as ActionTypes from './action-types'
import { ToastType } from '../constants'

export const showToast = (type: $Values<ToastType>, message: string) => ({
  type: ActionTypes.SHOW_TOAST,
  payload: {
    type,
    message,
  },
})

export const hideToast = () => ({
  type: ActionTypes.HIDE_TOAST,
})
