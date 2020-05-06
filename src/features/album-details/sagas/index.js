import { call, put, takeLatest, select } from 'redux-saga/effects'
import * as ActionTypes from '../actions/action-types'
import * as Actions from '../actions'
import { spotifyApi, appleMusicApi } from '../../../apis'
import { sourceSelector } from '../../search/selectors'
import { SOURCE } from '../../../constants'
import { transformAlbumDetailToSpotify } from '../../search/utils/transform'
import { get } from 'lodash'

function* getAlbumDetails(action) {
  try {
    const { id } = action.payload
    const source = yield select(state => sourceSelector(state))

    let data = {}
    switch (source) {
      case SOURCE.appleMusic:
        const result = yield call(appleMusicApi.getAlbumDetails, id)
        const rawAlbum = get(result, 'data.data[0]')
        data = yield call(transformAlbumDetailToSpotify, rawAlbum)
        console.log('function*getAlbumDetails -> response', data)
        break
      default:
        response = yield call(spotifyApi.getAlbumDetails, id)
        data = response.data
    }

    yield put(Actions.getAlbumDetailsSuccess(data))
  } catch (error) {
    yield put(Actions.getAlbumDetailsFailure(error))
  }
}

function* albumDetailsSaga() {
  yield takeLatest(ActionTypes.GET_ALBUM_DETAILS_REQUEST, getAlbumDetails)
}

export default albumDetailsSaga
