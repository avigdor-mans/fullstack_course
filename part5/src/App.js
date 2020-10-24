import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import AdBlog from './components/AdBlog'
import Msg from './components/Msg'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [ msg, setMsg ] = useState(null)
  const [ msgStyle, setMSgStyle ] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(sortBlogs(blogs))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sortBlogs = (blogs) => blogs.sort((blogA, blogB) => blogB.likes-blogA.likes)

  const setColor = (color) =>
    setMSgStyle({
      color: color,
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    })

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      setColor('green')
      setMsg(`Welcome ${user.name}`)
      setTimeout(() => {
        setMsg(null)
      }, 5000)
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception){
      setColor('red')
      setMsg(exception.response.data.error)
      setTimeout(() => {
        setMsg(null)
      }, 5000)
    }
  }

  const hendleLikes = async (blog) => {
    try{
      const updateBlog = await blogService.update(blog.id,{
        user: user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      })
      console.log(updateBlog)
      setColor('green')
      setMsg(`now ${updateBlog.title} have ${updateBlog.likes} likes!`)
      setTimeout(() => {
        setMsg(null)
      }, 5000)
      setBlogs(sortBlogs(blogs.filter((b) => b.id!==blog.id).concat(updateBlog)))
    }catch (exception){
      console.log(exception)
      setColor('red')
      setMsg(exception.response)
      setTimeout(() => {
        setMsg(null)
      }, 5000)
    }
  }

  const handleDelete = async (blog) => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
      try{
        console.log(blog)
        await blogService.deleteBlog(blog.id)
        setColor('green')
        setMsg(`The blog ${blog.title} have been deleted`)
        setTimeout(() => {
          setMsg(null)
        }, 5000)
        setBlogs(blogs.filter(b => b.id!==blog.id))
      }catch (exception){
        setColor('red')
        setMsg(exception.response.data.error)
        setTimeout(() => {
          setMsg(null)
        }, 5000)
      }
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setColor('green')
    setMsg(`goodbye ${user.name}`)
    setTimeout(() => {
      setMsg(null)
    }, 5000)
    setUser(null)
    setUsername('')
    setPassword('')
  }



  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Msg msg={msg} style={msgStyle} />
      <Login handleLogin={handleLogin} username={username} setUsername={setUsername}
        password={password} setPassword={setPassword} />
    </div>
  )

  const blogsForm = () => (
    <div>
      <h2>blogs</h2>
      <Msg msg={msg} style={msgStyle} />
      <p>{user ? user.name : ''} logged-in <button onClick={logout} >logout</button></p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <AdBlog setMsg={setMsg} setColor={setColor} blogs={blogs} setBlogs={setBlogs} sortBlogs={sortBlogs} ref={blogFormRef} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} hendleLikes={hendleLikes} handleDelete={handleDelete} ref={blogFormRef} />
      )}

    </div>
  )
  return( <div>{user===null ? loginForm() : blogsForm()}</div> )
}

export default App