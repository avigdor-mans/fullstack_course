import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link, useParams, useHistory } from "react-router-dom"
import {initBlogs} from './reducers/blogReducer'
import Login from './components/Login'
import AdBlog from './components/blogs/AdBlog'
import Msg from './components/Msg'
import Togglable from './components/togglable/Togglable'
import BlogsForm from './components/blogs/BlogsForm'
import Menu from './components/Menu'
import Users from './components/Users'
import initUsers from './reducers/usersReducer'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
    if (loggedUserJSON) {
      dispatch({type: 'LOGIN', data: JSON.parse(loggedUserJSON)})
    }
  }, [])

  useEffect(() => {
    dispatch(initUsers())
  },[])

  // const loginForm = () => (
  //   <div>
  //     <h2>Log in to application</h2>
  //     <Msg />
  //     <Login />
  //   </div>
  // )

  //const blogsForm = () => (
   return(

    <Router>
    <Menu />
    <Switch>
      <Route path='/blogs' >
        <h1>blogs</h1>
        <Msg />
        <Login />
        <Togglable buttonLabel="new blog" ref={blogFormRef} >
          <AdBlog ref={blogFormRef} /> <br/>
        </Togglable>
        <BlogsForm />
      </Route>

      <Route path='/users' >
        <Users />
      </Route>
      
      <Route path='/' >
        <div>
          <h2>Log in to application</h2>
          <Msg />
          <Login />
        </div>
      </Route>

    </Switch>
    </Router>)

// return( <div>{user===null ? loginForm() : blogsForm()}</div> )
}

export default App