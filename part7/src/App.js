import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import {initBlogs} from './reducers/blogReducer'
import userService from './services/users'
import Login from './components/logs/Login'
import Msg from './components/Msg'
import BlogsForm from './components/blogs/BlogsForm'
import FullBlogForm from './components/blogs/FullBlogForm'
import Menu from './components/Menu'
import Users from './components/users/Users'
import User from './components/users/User'

const App = () => {
  const ref = useRef()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const [users, setUsers] = useState(null)
  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
    if (loggedUserJSON) {
      dispatch({type: 'LOGIN', data: JSON.parse(loggedUserJSON)})
    }
  }, [dispatch])

  
  useEffect(() => {
    const fetch = async () => {
      const users = await userService.getAll()
      setUsers(users)
    }
    fetch()
  }, [blogs])

  const loginForm = () => (
      <Login />
  )

  const routerForm = () => (
    <Router>
    <Menu />
    <Msg />

    <Switch>
      <Route path='/users/:id' >
        <User users={users} />
      </Route>

      <Route path='/users' >
        <Users users={users} />
      </Route>
      
      <Route path='/blogs/:id' >
        <FullBlogForm />
      </Route>

      <Route path='/' >
        <div>
          <BlogsForm ref={ref} />
        </div>
      </Route>      

    </Switch>
  </Router>
  )

   return user===null ? loginForm() : routerForm()

}

export default App