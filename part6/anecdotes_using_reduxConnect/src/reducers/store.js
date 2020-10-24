import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './anecdoteReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
    blogs: reducers.actReducer,
    message: reducers.notificationReducer,
    filterAn: reducers.filterReducer
})
const store = createStore(reducer, composeWithDevTools(), applyMiddleware(thunk))

export default store