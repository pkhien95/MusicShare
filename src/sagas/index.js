import { all } from 'redux-saga/effects'
import spotifySaga from './spotify'
import bootstrapSaga from './bootstrap'
import searchSaga from '../features/search/sagas'
import albumDetailsSaga from '../features/album-details/sagas'
import artistDetailsSaga from '../features/artist-details/sagas'
import homeSaga from '../features/home/sagas'
import appleMusicSaga from './appleMusic'

function* rootSaga() {
  yield all([
    bootstrapSaga(),
    spotifySaga(),
    searchSaga(),
    albumDetailsSaga(),
    artistDetailsSaga(),
    homeSaga(),
    appleMusicSaga(),
  ])
}

export default rootSaga
