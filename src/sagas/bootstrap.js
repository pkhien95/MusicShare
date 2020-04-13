import { call, put, select, take, takeEvery } from 'redux-saga/effects'
import {
  ActionTypes,
  authSpotifyRequest,
  bootstrapApplicationComplete,
  refreshSpotifyRequest,
} from './actions'
import { isEmpty } from 'lodash'
import { isSpotifyTokenValid } from '../utils'

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

function* bootstrapApplication() {
  yield take(ActionTypes.REHYDRATION_COMPLETE)
  const spotifyAuth = yield select(state => state.spotify.auth)

  if (isEmpty(spotifyAuth)) {
    yield call(authorizeSpotify)
  } else if (!isSpotifyTokenValid(spotifyAuth)) {
    yield call(refreshSpotify)
  } else {
    // yield call(SpotifyRemote.connect, spotifyAuth.accessToken)
    // const session = yield call(auth.getSession)
    // console.log(session)
  }

  yield put(bootstrapApplicationComplete())
}

function* bootstrapSaga() {
  yield takeEvery(ActionTypes.BOOTSTRAP_APPLICATION_START, bootstrapApplication)
}

export default bootstrapSaga
