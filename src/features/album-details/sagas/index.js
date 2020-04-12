import { call, put, takeLatest } from 'redux-saga/effects'
import * as ActionTypes from '../actions/action-types'
import * as Actions from '../actions'
import { spotifyApi } from '../../../apis'

function* getAlbumDetails(action) {
  try {
    const { id } = action.payload
    const response = yield call(spotifyApi.getAlbumDetails, id)
    yield put(Actions.getAlbumDetailsSuccess(response.data))
  } catch (error) {
    yield put(Actions.getAlbumDetailsFailure(error))
  }
}

function* albumDetailsSaga() {
  yield takeLatest(ActionTypes.GET_ALBUM_DETAILS_REQUEST, getAlbumDetails)
}

export default albumDetailsSaga
