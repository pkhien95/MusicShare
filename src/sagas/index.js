import { all } from 'redux-saga/effects'
import spotifySaga from './spotify'
import bootstrapSaga from './bootstrap'
import searchSaga from '../features/search/sagas'

function* rootSaga() {
  yield all([bootstrapSaga(), spotifySaga(), searchSaga()])
}

export default rootSaga
