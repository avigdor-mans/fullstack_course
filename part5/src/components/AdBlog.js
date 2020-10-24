import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const AdBlog = React.forwardRef(({ setMsg, setColor, blogs, setBlogs, sortBlogs }, ref) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async () => {
    ref.current.toggleVisibility()
    const newBlog= {
      title: title,
      author: author,
      url: url
    }
    try{
      const blog = await blogService.create(newBlog)
      setColor('green')
      setMsg(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setMsg(null)
      }, 5000)
      setBlogs(sortBlogs(blogs.concat(blog)))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception){
      setColor('red')
      setMsg(exception.response.data.error)
      setTimeout(() => {
        setMsg(null)
      }, 5000)
    }
  }

  return (
    <div className="formDiv" >
    <form onSubmit={handleNewBlog}>
      <h2>create new</h2>
      <div>
        title:
        <input
          id="title"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          id="author"
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          id="url"
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id="creat" type="submit">creat</button>
    </form>
    </div>)
})

AdBlog.propTypes = {
  setMsg: PropTypes.func.isRequired,
  setColor: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired,
  sortBlogs: PropTypes.func.isRequired,
}
export default AdBlog