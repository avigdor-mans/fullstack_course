import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {setNotification} from '../reducers/msgReducer'
import {userLogout, userLogin} from '../reducers/userReducer'

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

  const handleLogout = () => {
    dispatch(setNotification(`goodbye ${user.name}`, 'green'))
    dispatch(userLogout())
    setUsername('')
    setPassword('')
    history.push('/')    
  }

  if (user!==null){
    return (<p>{user ? user.name : ''} logged-in <button onClick={handleLogout} >logout</button></p>)
  }
  return (
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
    </form>)
}

export default Login