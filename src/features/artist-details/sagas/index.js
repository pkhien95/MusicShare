import { call, put, takeLatest, select } from 'redux-saga/effects'
import * as ActionTypes from '../actions/action-types'
import * as Actions from '../actions'
import { spotifyApi, appleMusicApi } from '../../../apis'
import { sourceSelector } from '../../search/selectors'
import { SOURCE } from '../../../constants'
import { transformArtistDetailToSpotify } from '../../search/utils/transform'
import { get } from 'lodash'

function* getArtistTopTracks(action) {
  try {
    const { id } = action.payload
    const source = yield select(state => sourceSelector(state))

    let tracks = {}
    switch (source) {
      case SOURCE.appleMusic:
        const result = yield call(appleMusicApi.getArtistTopTracks, id)
        const rawArtist = get(result, 'data.data[0]')
        tracks = yield call(transformArtistDetailToSpotify, rawArtist)
        break
      default:
        const response = yield call(spotifyApi.getArtistTopTracks, id)
        tracks = response.data.tracks
    }

    yield put(Actions.getArtistTopTracksSuccess(tracks))
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
