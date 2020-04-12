import entitiesReducer from './entities'
import { combineReducers } from 'redux'
import spotifyReducer from './spotify'
import { searchReducer } from '../features/search'
import bottomActionSheetReducer from '../features/bottom-actions-sheet/reducers'
import toastReducer from '../features/toast/reducers'

const rootReducer = combineReducers({
  entities: entitiesReducer,
  spotify: spotifyReducer,
  search: searchReducer,
  bottomActionSheet: bottomActionSheetReducer,
  toast: toastReducer,
})

export default rootReducer
