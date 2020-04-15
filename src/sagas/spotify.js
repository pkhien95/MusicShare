import { refresh } from 'react-native-app-auth'
import { call, fork, put, select, takeLatest } from 'redux-saga/effects'
import {
  ActionTypes,
  authSpotifyFailure,
  authSpotifySuccess,
  refreshSpotifyFailure,
  refreshSpotifySuccess,
} from './actions'
import { RemoteEvent, SPOTIFY_CONFIG } from '../constants/spotify'
import { ApiScope, auth, remote } from 'react-native-spotify-remote'
import { showToast } from '../features/toast/actions'
import { ToastType } from '../features/toast/constants'

function* authorizeAppRemote() {
  try {
    const config = {
      clientID: SPOTIFY_CONFIG.clientId,
      redirectURL: SPOTIFY_CONFIG.redirectUrl,
      tokenRefreshURL: SPOTIFY_CONFIG.tokenRefreshUrl,
      tokenSwapURL: SPOTIFY_CONFIG.tokenSwapUrl,
      scope: ApiScope.AppRemoteControlScope,
      playURI: 'spotify:track:7p5bQJB4XsZJEEn6Tb7EaL',
    }
    const token = yield call(auth.initialize, config)
    yield call(remote.connect, token)
    const isRemoteConnected = yield call(remote.isConnectedAsync)
    if (!isRemoteConnected) {
      throw null
    }
    yield call(remote.pause)
    return yield call(auth.getSession)
  } catch (error) {
    yield put(showToast(ToastType.ERROR, 'Connect to App Remote failed'))
  }
}

function* authSpotify() {
  try {
    const isRemoteConnected = yield call(remote.isConnectedAsync)
    if (!isRemoteConnected) {
      const session = yield call(authorizeAppRemote)
      return yield put(authSpotifySuccess(session))
    }
    const session = yield call(auth.getSession)
    return yield put(authSpotifySuccess(session))
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

function* handleRemoteEvent(action) {
  const { event } = action.payload

  switch (event) {
    case RemoteEvent.REMOTE_DISCONNECTED:
      const session = yield select(state => state.spotify.auth)
      if (session.expired) {
        yield fork(authorizeAppRemote)
      } else {
        yield fork(remote.connect, session.accessToken)
      }
  }
}

function* spotifySaga() {
  yield takeLatest(ActionTypes.AUTHORIZE_SPOTIFY_REQUEST, authSpotify)
  yield takeLatest(ActionTypes.REFRESH_SPOTIFY_REQUEST, refreshSpotify)
  yield takeLatest(ActionTypes.SPOTIFY_RECEIVE_EVENT, handleRemoteEvent)
}

export default spotifySaga
