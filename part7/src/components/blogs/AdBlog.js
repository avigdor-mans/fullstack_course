import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {addBlog} from '../../reducers/blogReducer'
import {setNotification} from '../../reducers/msgReducer'
import PropTypes from 'prop-types'

const AdBlog = React.forwardRef((props,ref) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleNewBlog = async () => {
    ref.current.toggleVisibility()
    const newBlog= {
      title: title,
      author: author,
      url: url
    }
    try{
      dispatch(addBlog(newBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception){
      dispatch(setNotification(exception.response.data.error, 'red'))
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
    <br/>
    </div>)
})

AdBlog.propTypes = {
  setBlogs: PropTypes.func.isRequired,
  sortBlogs: PropTypes.func.isRequired,
}
export default AdBlog