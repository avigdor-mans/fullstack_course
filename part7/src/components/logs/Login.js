import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {setNotification} from '../../reducers/msgReducer'
import {userLogout, userLogin} from '../../reducers/userReducer'
import Msg from '../Msg'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const history = useHistory()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(userLogin({username, password}))
      dispatch(setNotification(`Welcome ${user.name}`, 'green'))
      setUsername('')
      setPassword('')
      history.push('/blogs')    
    } catch (exception){
      dispatch(setNotification(exception.response, 'red'))
    }
  }

  return (
    <div>
    <h2>Log in to application</h2>
    <Msg />
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
    </div>)
}

export default Login