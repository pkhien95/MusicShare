import { call, delay, put, select, take, takeEvery } from 'redux-saga/effects'
import {
  ActionTypes,
  authSpotifyRequest,
  bootstrapApplicationComplete,
  refreshSpotifyRequest,
} from './actions'
import { isEmpty } from 'lodash'
import { isSpotifyTokenValid } from '../utils'
import { ApiScope, auth, remote } from 'react-native-spotify-remote'
import { SPOTIFY_CONFIG } from '../constants/spotify'

function* authorizeSpotify() {
  yield put(authSpotifyRequest())
  yield take([
    ActionTypes.AUTHORIZE_SPOTIFY_SUCCESS,
    ActionTypes.AUTHORIZE_SPOTIFY_FAILURE,
  ])
}

function* refreshSpotify() {
  yield put(refreshSpotifyRequest())
  const action = yield take([
    ActionTypes.REFRESH_SPOTIFY_SUCCESS,
    ActionTypes.REFRESH_SPOTIFY_FAILURE,
  ])
  if (action.type === ActionTypes.REFRESH_SPOTIFY_FAILURE) {
    yield call(authorizeSpotify)
  }
}

function* authorizeAppRemote() {
  yield delay(500)
  const config = {
    clientID: SPOTIFY_CONFIG.clientId,
    redirectURL: SPOTIFY_CONFIG.redirectUrl,
    tokenRefreshURL: SPOTIFY_CONFIG.tokenRefreshUrl,
    tokenSwapURL: SPOTIFY_CONFIG.tokenSwapUrl,
    scope: ApiScope.AppRemoteControlScope,
  }
  const token = yield call(auth.initialize, config)
  yield call(remote.connect, token)
}

function* bootstrapApplication() {
  yield take(ActionTypes.REHYDRATION_COMPLETE)
  const spotifyAuth = yield select(state => state.spotify.auth)

  if (isEmpty(spotifyAuth)) {
    yield call(authorizeSpotify)
  } else if (!isSpotifyTokenValid(spotifyAuth)) {
    yield call(refreshSpotify)
  }

  const isRemoteConnected = yield call(remote.isConnectedAsync)
  if (!isRemoteConnected) {
    yield call(authorizeAppRemote)
  }

  yield put(bootstrapApplicationComplete())
}

function* bootstrapSaga() {
  yield takeEvery(ActionTypes.BOOTSTRAP_APPLICATION_START, bootstrapApplication)
}

export default bootstrapSaga
