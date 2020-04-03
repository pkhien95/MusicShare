import { authorize, refresh } from 'react-native-app-auth'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  ActionTypes,
  authSpotifyFailure,
  authSpotifySuccess,
  refreshSpotifyFailure,
  refreshSpotifySuccess,
} from './actions'
import { SPOTIFY_CONFIG } from '../constants/spotify'

function* authSpotify() {
  try {
    const authState = yield call(authorize, SPOTIFY_CONFIG)
    yield put(authSpotifySuccess(authState))
  } catch (error) {
    yield put(authSpotifyFailure(error))
  }
}

function* refreshSpotify() {
  try {
    const refreshToken = yield select(state => state.spotify.auth.refreshToken)
    const authState = yield call(refresh, SPOTIFY_CONFIG, { refreshToken })
    yield put(refreshSpotifySuccess(authState))
  } catch (error) {
    yield put(refreshSpotifyFailure(error))
  }
}

function* spotifySaga() {
  yield takeLatest(ActionTypes.AUTHORIZE_SPOTIFY_REQUEST, authSpotify)
  yield takeLatest(ActionTypes.REFRESH_SPOTIFY_REQUEST, refreshSpotify)
}

export default spotifySaga
