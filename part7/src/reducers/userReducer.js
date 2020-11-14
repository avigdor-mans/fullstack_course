import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './msgReducer'

export const userLogin = ({username, password}) => {
    return async dispatch => {
        const user = await loginService.login({username,password})
        window.localStorage.setItem('loggedBlogsappUser', JSON.stringify(user))
        dispatch(setNotification(`Welcome ${user.name}`, 'green'))
        dispatch({type: 'LOGIN', data: user})
    }
}

export const userLogout = () => {
    return dispatch => {
        window.localStorage.removeItem('loggedBlogsappUser')
        dispatch({type: 'LOGOUT', data: null})
    }
}

const userReducer = (state=null, action) => {
    switch (action.type) {
        case 'LOGIN' :
            blogService.setToken(action.data.token)
            return action.data
        case 'LOGOUT' :
            return action.data
        default : return state
    }
}

export default userReducer