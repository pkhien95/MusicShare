import { call, put, takeLatest } from 'redux-saga/effects'
import * as ActionTypes from './actions/action-types'
import * as Actions from './actions'
import { Auth } from '@pkhien/react-native-apple-music'
import { SOURCE } from '../constants'
import { SELECT_SOURCE } from '../features/profile/actions/action-types'

function* authAppleMusic() {
  const authStatus = yield call(Auth.requestAuthorization)
  if (authStatus !== Auth.authorizationStatusAuthorized) {
    return yield put(Actions.authAppleMusicFailure(null))
  }
  const capability = yield call(Auth.requestCapabilities)
  if (capability !== Auth.capabilityMusicCatalogPlayback) {
    return yield put(Actions.authAppleMusicFailure(null))
  }
  yield put(Actions.authAppleMusicSuccess())
}

function* handleSourceChanged(action) {
  const { source } = action.payload
  if (source === SOURCE.appleMusic) {
    yield call(authAppleMusic)
  }
}

function* appleMusicSaga() {
  yield takeLatest(ActionTypes.AUTHORIZE_APPLE_MUSIC_REQUEST, authAppleMusic)
  yield takeLatest(SELECT_SOURCE, handleSourceChanged)
}

export default appleMusicSaga
