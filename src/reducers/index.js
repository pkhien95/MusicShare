import entitiesReducer from './entities'
import { combineReducers } from 'redux'
import spotifyReducer from './spotify'
import { searchReducer } from '../features/search'

const rootReducer = combineReducers({
  entities: entitiesReducer,
  spotify: spotifyReducer,
  search: searchReducer,
})

export default rootReducer
