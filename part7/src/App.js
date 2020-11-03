import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {initBlogs} from './reducers/blogReducer'
import Login from './components/Login'
import AdBlog from './components/AdBlog'
import Msg from './components/Msg'
import Togglable from './components/Togglable'
import BlogsForm from './components/BlogsForm'

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

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Msg />
      <Login />
    </div>
  )

  const blogsForm = () => (
    <div>
      <h1>blogs</h1>
      <Msg />
      <Login />
      <Togglable buttonLabel="new blog" ref={blogFormRef} >
        <AdBlog ref={blogFormRef} /> <br/>
      </Togglable>
      <BlogsForm ref={blogFormRef} />

    </div>
  )

  console.log(user)
  return( <div>{user===null ? loginForm() : blogsForm()}</div> )
}

export default App