import { spotifyApi } from '../../../apis'
import { call, put, takeLatest } from 'redux-saga/effects'
import { spotifySearchFailure, spotifySearchSuccess } from '../actions'
import * as ActionTypes from '../actions/action-types'
import { get } from 'lodash'

function* search(action) {
  try {
    const { keywords, types, limit, offset } = action.payload

    const result = yield call(spotifyApi.search, keywords, types, limit, offset)
    const artists = get(result, 'data.artists.items', [])
    const albums = get(result, 'data.albums.items', [])
    yield put(spotifySearchSuccess(artists, albums))
  } catch (error) {
    yield put(spotifySearchFailure(error))
  }
}

function* searchSaga() {
  yield takeLatest(ActionTypes.SPOTIFY_SEARCH_REQUEST, search)
}

export default searchSaga
