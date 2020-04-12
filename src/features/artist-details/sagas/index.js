import { call, put, takeLatest } from 'redux-saga/effects'
import * as ActionTypes from '../actions/action-types'
import * as Actions from '../actions'
import { spotifyApi } from '../../../apis'

function* getArtistTopTracks(action) {
  try {
    const { id } = action.payload
    const response = yield call(spotifyApi.getArtistTopTracks, id)
    yield put(Actions.getArtistTopTracksSuccess(response.data.tracks))
  } catch (error) {
    yield put(Actions.getArtistTopTracksFailure(error))
  }
}

function* artistDetailsSaga() {
  yield takeLatest(
    ActionTypes.GET_ARTIST_TOP_TRACKS_REQUEST,
    getArtistTopTracks,
  )
}

export default artistDetailsSaga
