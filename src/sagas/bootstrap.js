import {
  call,
  put,
  select,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects'
import {
  ActionTypes,
  authSpotifyRequest,
  bootstrapApplicationComplete,
  authAppleMusicRequest
} from './actions'
import { isEmpty } from 'lodash'
import { remote } from 'react-native-spotify-remote'
import { showToast } from '../features/toast/actions'
import { ToastType } from '../features/toast/constants'
import { sourceSelector } from '../features/search/selectors'
import { SOURCE } from '../constants'

function* authorizeSpotify() {
  yield put(authSpotifyRequest())
  const action = yield take([
    ActionTypes.AUTHORIZE_SPOTIFY_SUCCESS,
    ActionTypes.AUTHORIZE_SPOTIFY_FAILURE,
  ])
  if (action.type === ActionTypes.AUTHORIZE_SPOTIFY_FAILURE) {
    yield put(showToast(ToastType.ERROR, 'Authorize Spotify API failed'))
  }
}

function* checkSpotifyAuth() {
  const currentSession = yield select(state => state.spotify.auth)
  const isRemoteConnected = yield call(remote.isConnectedAsync)
  if (isEmpty(currentSession) || currentSession.expired || !isRemoteConnected) {
    yield call(authorizeSpotify)
  }
}

function* checkAppleMusicAuth() {
  yield put(authAppleMusicRequest())
  const action = yield take([
    ActionTypes.AUTHORIZE_APPLE_MUSIC_SUCCESS,
    ActionTypes.AUTHORIZE_APPLE_MUSIC_FAILURE,
  ])
  if (action.type === ActionTypes.AUTHORIZE_APPLE_MUSIC_FAILURE) {
    yield put(showToast(ToastType.ERROR, 'Authorize Apple Music API failed'))
  }
}

function* bootstrapApplication() {
  try {
    yield take(ActionTypes.REHYDRATION_COMPLETE)
    const source = yield select(state => sourceSelector(state))
    if (source === SOURCE.spotify) {
      yield call(checkSpotifyAuth)
    } else {
      yield call(checkAppleMusicAuth)
    }
    yield put(bootstrapApplicationComplete())
  } catch (error) {}
}

function* bootstrapSaga() {
  yield takeEvery(ActionTypes.BOOTSTRAP_APPLICATION_START, bootstrapApplication)
  yield takeLatest(ActionTypes.CHECK_SPOTIFY_AUTH, checkSpotifyAuth)
}

export default bootstrapSaga
