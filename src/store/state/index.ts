import { combineReducers } from 'redux'
import commonReducer from './common'
import userReducer from './user'

export default combineReducers({
	common: commonReducer,
	user: userReducer
})
