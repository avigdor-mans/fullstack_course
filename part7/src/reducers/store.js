import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import msgReducer from './msgReducer'
import blogReducer from './blogReducer'
import userResucer from './userReducer'
import usersReducer from './usersReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
    message: msgReducer,
    blogs: blogReducer,
    user: userResucer,
    users: usersReducer
})
const store = createStore(reducer, composeWithDevTools(), applyMiddleware(thunk))

export default store