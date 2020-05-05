import {
  call,
  put,
  select,
  take,
  takeEvery,
  takeLatest,
  fork
} from 'redux-saga/effects'
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

function* bootstrapApplication() {
  try {
    yield take(ActionTypes.REHYDRATION_COMPLETE)
    yield call(checkSpotifyAuth)
    yield put(bootstrapApplicationComplete())
  } catch (error) {}
}

function* bootstrapSaga() {
  yield takeEvery(ActionTypes.BOOTSTRAP_APPLICATION_START, bootstrapApplication)
  yield takeLatest(ActionTypes.CHECK_SPOTIFY_AUTH, checkSpotifyAuth)
}

export default bootstrapSaga
