import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../../reducers/msgReducer'
import { userLogin } from '../../reducers/userReducer'
import Msg from '../Msg'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(userLogin({username, password}))
      setUsername('')
      setPassword('')
    } catch (exception){
      dispatch(setNotification(exception.response, 'red'))
    }
  }

  return (
    <div className="container">
    <h2>Log in to application</h2>
    <Msg />
    <Form onSubmit={handleLogin} >
      <Form.Group controlId="formBasicName">
        <Form.Label>Username</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter username" 
          value={username} 
          onChange={({ target }) => setUsername(target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={({ target }) => setPassword(target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>)
}

export default Login