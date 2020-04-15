import entitiesReducer from './entities'
import { combineReducers } from 'redux'
import spotifyReducer from './spotify'
import { searchReducer } from '../features/search'
import bottomActionSheetReducer from '../features/bottom-actions-sheet/reducers'
import toastReducer from '../features/toast/reducers'
import homeReducer from '../features/home/reducers'
import appReducer from './app'

const rootReducer = combineReducers({
  app: appReducer,
  entities: entitiesReducer,
  spotify: spotifyReducer,
  search: searchReducer,
  bottomActionSheet: bottomActionSheetReducer,
  toast: toastReducer,
  home: homeReducer,
})

export default rootReducer
