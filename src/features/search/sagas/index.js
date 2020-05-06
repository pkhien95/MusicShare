import { spotifyApi, appleMusicApi } from '../../../apis'
import { call, put, takeLatest } from 'redux-saga/effects'
import { spotifySearchFailure, spotifySearchSuccess } from '../actions'
import * as ActionTypes from '../actions/action-types'
import { get } from 'lodash'
import {
  transformArtistsToSpotify,
  transformAlbumsToSpotify,
} from '../utils/transform'

function* search(action) {
  const type = action.type
  switch (type) {
    case ActionTypes.APPLE_MUSIC_SEARCH_REQUEST:
      yield call(appleMusicSearch, action)
      break
    default:
      yield call(spotifySearch, action)
  }
}

function* spotifySearch(action) {
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

function* appleMusicSearch(action) {
  try {
    const { keywords, types, limit, offset } = action.payload
    const result = yield call(
      appleMusicApi.search,
      keywords,
      types,
      limit,
      offset,
    )
    const artists = get(result, 'data.results.artists.data', [])
    const albums = get(result, 'data.results.albums.data', [])
    const transformedArtists = yield call(transformArtistsToSpotify, artists)
    const transformedAlbums = yield call(transformAlbumsToSpotify, albums)

    yield put(spotifySearchSuccess(transformedArtists, transformedAlbums))
  } catch (error) {
    yield put(spotifySearchFailure(error))
  }
}

function* searchSaga() {
  yield takeLatest(
    [
      ActionTypes.SPOTIFY_SEARCH_REQUEST,
      ActionTypes.APPLE_MUSIC_SEARCH_REQUEST,
    ],
    search,
  )
}

export default searchSaga
