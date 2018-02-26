import { createStore, combineReducers, applyMiddleware } from 'redux'

import appReducer from './reducers/app'
import messageReducer from './reducers/message'
import songsReducer from './reducers/songs'

import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
	appReducer,
	messageReducer,
	songsReducer
})

const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(thunk))
)

export default store
