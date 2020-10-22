import { createStore, combineReducers } from 'redux'
import reducers from './anecdoteReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
    blogs: reducers.actReducer,
    message: reducers.notificationReducer,
    filterAn: reducers.filterReducer
})
const store = createStore(reducer, composeWithDevTools())

export default store