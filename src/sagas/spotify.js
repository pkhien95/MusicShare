import {
  call,
  delay,
  put,
  select,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects'
import {
  ActionTypes,
  authSpotifyFailure,
  authSpotifySuccess,
  setupSpotifyEventHandler,
} from './actions'
import {
  MAXIMUM_RETRY_AUTH_REMOTE,
  RemoteEvent,
  SPOTIFY_CONFIG,
} from '../constants/spotify'
import { ApiScope, auth, remote } from 'react-native-spotify-remote'
import { showToast } from '../features/toast/actions'
import { ToastType } from '../features/toast/constants'
import { isEmpty } from 'lodash'
import { eventChannel } from 'redux-saga'
import { SOURCE } from '../constants'
import { SELECT_SOURCE } from '../features/profile/actions/action-types'

const config = {
  clientID: SPOTIFY_CONFIG.clientId,
  redirectURL: SPOTIFY_CONFIG.redirectUrl,
  tokenRefreshURL: SPOTIFY_CONFIG.tokenRefreshUrl,
  tokenSwapURL: SPOTIFY_CONFIG.tokenSwapUrl,
  scope: ApiScope.AppRemoteControlScope,
  playURI: 'spotify:track:7p5bQJB4XsZJEEn6Tb7EaL',
}

function* retryAuthRemote() {
  for (let i = 0; i < MAXIMUM_RETRY_AUTH_REMOTE; i++) {
    try {
      yield call(disconnectRemote)
      const token = yield call(auth.initialize, config)
      yield call(remote.connect, token)
      return true
    } catch (error) {}
  }
  return false
}

function* authorizeAppRemote() {
  try {
    let isRemoteConnected = yield call(remote.isConnectedAsync)
    if (!isRemoteConnected) {
      const token = yield call(auth.initialize, config)
      yield call(remote.connect, token)
      yield call(remote.pause)
      return yield call(auth.getSession)
    }
  } catch (error) {
    const success = yield call(retryAuthRemote)
    if (success) {
      return yield call(auth.getSession)
    }
    yield put(showToast(ToastType.ERROR, 'Connect to App Remote failed'))
  }
}

function* authSpotify() {
  try {
    const isRemoteConnected = yield call(remote.isConnectedAsync)
    if (!isRemoteConnected) {
      const session = yield call(authorizeAppRemote)
      yield put(setupSpotifyEventHandler())
      return yield put(authSpotifySuccess(session))
    }
    const session = yield call(auth.getSession)
    yield put(setupSpotifyEventHandler())
    return yield put(authSpotifySuccess(session))
  } catch (error) {
    yield put(authSpotifyFailure(error))
  }
}

function* handleRemoteEvent(event) {
  switch (event) {
    case RemoteEvent.REMOTE_DISCONNECTED:
      yield delay(500)
      const currentSession = yield select(state => state.spotify.auth)
      if (!isEmpty(currentSession)) {
        yield call(disconnectRemote)
        yield call(authSpotify)
      }
  }
}

const createSpotifyEventChannel = () => {
  return eventChannel(emit => {
    const events = [
      RemoteEvent.PLAYER_STATE_CHANGED,
      RemoteEvent.REMOTE_CONNECTED,
      RemoteEvent.REMOTE_DISCONNECTED,
    ]
    events.map(event => {
      remote.addListener(event, () => {
        emit(event)
      })
    })

    return () => {
      events.map(event => {
        remote.removeAllListeners(event)
      })
    }
  })
}

function* setupRemoteEvent() {
  const spotifyEventChannel = createSpotifyEventChannel()
  try {
    yield takeEvery(spotifyEventChannel, handleRemoteEvent)
  } catch (error) {
    spotifyEventChannel.close()
  }
}

function* removeAllEventListeners() {
  const events = [
    RemoteEvent.PLAYER_STATE_CHANGED,
    RemoteEvent.REMOTE_CONNECTED,
    RemoteEvent.REMOTE_DISCONNECTED,
  ]
  events.map(event => {
    remote.removeAllListeners(event)
  })
}

function* disconnectRemote() {
  yield call(removeAllEventListeners)
  yield call(auth.endSession)
  yield call(remote.disconnect)
}

function* handleSourceChanged(action) {
  const { source } = action.payload
  if (source !== SOURCE.spotify) {
    yield call(disconnectRemote)
  } else {
    yield call(authSpotify)
  }
}

function* spotifySaga() {
  yield takeLatest(ActionTypes.AUTHORIZE_SPOTIFY_REQUEST, authSpotify)
  yield takeLatest(ActionTypes.SPOTIFY_RECEIVE_EVENT, handleRemoteEvent)
  yield takeLatest(ActionTypes.DISCONNECT_SPOTIFY_REMOTE, disconnectRemote)
  yield takeLatest(ActionTypes.SET_UP_SPOTIFY_EVENT_HANDLER, setupRemoteEvent)
  yield takeLatest(SELECT_SOURCE, handleSourceChanged)
}

export default spotifySaga
