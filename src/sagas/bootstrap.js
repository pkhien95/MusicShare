import { call, fork, put, select, take, takeEvery } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import {
  ActionTypes,
  authSpotifyRequest,
  bootstrapApplicationComplete,
  spotifyReceiveEvent,
} from './actions'
import { isEmpty } from 'lodash'
import { remote } from 'react-native-spotify-remote'
import { showToast } from '../features/toast/actions'
import { ToastType } from '../features/toast/constants'
import { RemoteEvent } from '../constants/spotify'

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

function* handleRemoteEvent(event) {
  yield put(spotifyReceiveEvent(event))
}

function* setupRemoteEvent() {
  const spotifyEventChannel = createSpotifyEventChannel()
  try {
    yield takeEvery(spotifyEventChannel, handleRemoteEvent)
  } catch (error) {
    spotifyEventChannel.close()
  }
}

function* authorizeSpotify() {
  yield put(authSpotifyRequest())
  const action = yield take([
    ActionTypes.AUTHORIZE_SPOTIFY_SUCCESS,
    ActionTypes.AUTHORIZE_SPOTIFY_FAILURE,
  ])
  if (action.type === ActionTypes.AUTHORIZE_SPOTIFY_FAILURE) {
    yield put(showToast(ToastType.ERROR, 'Authorize Spotify API failed'))
  } else {
    // yield fork(setupRemoteEvent)
  }
}

function* bootstrapApplication() {
  try {
    yield take(ActionTypes.REHYDRATION_COMPLETE)
    const currentSession = yield select(state => state.spotify.auth)
    const isRemoteConnected = yield call(remote.isConnectedAsync)
    if (
      isEmpty(currentSession) ||
      currentSession.expired ||
      !isRemoteConnected
    ) {
      yield call(authorizeSpotify)
    }

    yield put(bootstrapApplicationComplete())
  } catch (error) {}
}

function* bootstrapSaga() {
  yield takeEvery(ActionTypes.BOOTSTRAP_APPLICATION_START, bootstrapApplication)
}

export default bootstrapSaga
