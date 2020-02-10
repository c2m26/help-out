import { combineReducers } from 'redux'
import needReducer from './needReducer'
import userLocationReducer from './userLocationReducer'

export default combineReducers({
  needs: needReducer,
  userCoords: userLocationReducer
})