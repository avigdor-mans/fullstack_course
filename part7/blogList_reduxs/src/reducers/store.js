import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import msgReducer from './msgReducer'
import blogReducer from './blogReducer'
import userResucer from './userReducer'

const reducer = combineReducers({
    message: msgReducer,
    blogs: blogReducer,
    user: userResucer
})
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store