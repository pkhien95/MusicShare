import { all } from 'redux-saga/effects'
import spotifySaga from './spotify'
import bootstrapSaga from './bootstrap'
import searchSaga from '../features/search/sagas'
import albumDetailsSaga from '../features/album-details/sagas'

function* rootSaga() {
  yield all([bootstrapSaga(), spotifySaga(), searchSaga(), albumDetailsSaga()])
}

export default rootSaga
