import { spotifyApi, appleMusicApi } from '../../../apis'
import { call, put, takeLatest, select } from 'redux-saga/effects'
import { spotifySearchFailure, spotifySearchSuccess } from '../actions'
import * as ActionTypes from '../actions/action-types'
import { get } from 'lodash'
import {
  transformArtistsToSpotify,
  transformAlbumsToSpotify,
} from '../utils/transform'
import { SOURCE } from '../../../constants'
import { sourceSelector } from '../selectors'

function* search(action) {
  try {
    const source = yield select(state => sourceSelector(state))
    const { keywords, types, limit, offset } = action.payload

    let result = {}
    let artists = []
    let albums = []

    switch (source) {
      case SOURCE.appleMusic:
        result = yield call(
          appleMusicApi.search,
          keywords,
          types,
          limit,
          offset,
        )
        const rawArtists = get(result, 'data.results.artists.data', [])
        const rawAlbums = get(result, 'data.results.albums.data', [])
        artists = yield call(transformArtistsToSpotify, rawArtists)
        albums = yield call(transformAlbumsToSpotify, rawAlbums)
        break
      default:
        result = yield call(spotifyApi.search, keywords, types, limit, offset)
        artists = get(result, 'data.artists.items', [])
        albums = get(result, 'data.albums.items', [])
    }

    yield put(spotifySearchSuccess(artists, albums))
  } catch (error) {
    yield put(spotifySearchFailure(error))
  }
}

function* searchSaga() {
  yield takeLatest(ActionTypes.SPOTIFY_SEARCH_REQUEST, search)
}

export default searchSaga
