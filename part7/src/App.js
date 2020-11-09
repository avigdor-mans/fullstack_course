import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import {initBlogs} from './reducers/blogReducer'
import Login from './components/logs/Login'
import AdBlog from './components/blogs/AdBlog'
import Msg from './components/Msg'
import Togglable from './components/Togglable'
import BlogsForm from './components/blogs/BlogsForm'
import Menu from './components/Menu'
import Users from './components/Users'
import initUsers from './reducers/usersReducer'
import Logout from './components/logs/Logout'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  
  // useEffect(() => {
  //   dispatch(initUsers())
  // },[])

  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
    if (loggedUserJSON) {
      dispatch({type: 'LOGIN', data: JSON.parse(loggedUserJSON)})
    }
  }, [])

  const loginForm = () => (
    <div>
      <Login />
    </div>
  )

  const homeBlog = () => (
    <div>
      <Menu />
      <h1>blogs</h1>
      <Msg />
      <Logout />
      <Togglable buttonLabel="new blog" ref={blogFormRef} >
        <AdBlog ref={blogFormRef} /> <br/>
      </Togglable>
      <BlogsForm />
    </div>
  )

   return(

    <Router>
    <Switch>

      <Route path='/blogs' >
        {homeBlog()}
      </Route>

      <Route path='/users' >
        <Menu />
        <Users />
      </Route>
      
      <Route path='/' >
        {user?loginForm():homeBlog()}
      </Route>      

    </Switch>
    </Router>)
}

export default App