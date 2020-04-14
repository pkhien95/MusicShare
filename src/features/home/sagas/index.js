import { call, put, select, takeLatest } from 'redux-saga/effects'
import * as ActionTypes from '../actions/action-types'
import * as Actions from '../actions'
import * as ToastActions from '../../toast/actions'
import { HOME_SCREEN_ITEM_TYPE } from '../constants'
import { ToastType } from '../../toast/constants'
import NavigationService from '../../../service/navigation'
import NAVIGATORS from '../../../constants/navigators'

function* itemExists(id: string, itemType: string) {
  const homeItems = yield select(state => state.home)
  const filteredItems = homeItems.filter(
    item => item.type === itemType && id === item.id,
  )
  return filteredItems.length > 0
}

function* addNewItem(action) {
  const {
    type,
    payload: { id },
  } = action
  if (type === ActionTypes.HOME_ADD_NEW_ALBUM_REQUEST) {
    if (yield call(itemExists, id, HOME_SCREEN_ITEM_TYPE.ALBUM)) {
      yield put(Actions.addNewAlbumFailure(null))
      yield put(
        ToastActions.showToast(
          ToastType.ERROR,
          'You already added this album.',
        ),
      )
    } else {
      yield put(Actions.addNewAlbumSuccess({ id }))
      NavigationService.navigatorRef.current?.navigate(NAVIGATORS.home)
      yield put(ToastActions.showToast(ToastType.INFO, 'Added album to home.'))
    }
  } else {
    if (yield call(itemExists, id, HOME_SCREEN_ITEM_TYPE.TRACK)) {
      yield put(Actions.addNewTrackFailure(null))
      yield put(
        ToastActions.showToast(
          ToastType.ERROR,
          'You already added this track.',
        ),
      )
    } else {
      yield put(Actions.addNewTrackSuccess({ id }))
      NavigationService.navigatorRef.current?.navigate(NAVIGATORS.home)
      yield put(ToastActions.showToast(ToastType.INFO, 'Added track to home.'))
    }
  }
}

function* homeSaga() {
  yield takeLatest(
    [
      ActionTypes.HOME_ADD_NEW_ALBUM_REQUEST,
      ActionTypes.HOME_ADD_NEW_TRACK_REQUEST,
    ],
    addNewItem,
  )
}

export default homeSaga
