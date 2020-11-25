import { combineReducers } from 'redux'
import commonReducer from './common'
import demoReducer from './demo'
import userReducer from './user'

export default combineReducers({
	common: commonReducer,
	demo: demoReducer,
	user: userReducer
})
