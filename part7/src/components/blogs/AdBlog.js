import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {addBlog} from '../../reducers/blogReducer'
import {setNotification} from '../../reducers/msgReducer'
import { Form, Button } from 'react-bootstrap'

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
    <Form onSubmit={handleNewBlog}>
      <h3>create new blog</h3>
      <Form.Group>
        <Form.Label>title</Form.Label>
        <Form.Control
        type='text'
        value={title}
        onChange={({ target }) => setTitle(target.value)}
         />
      </Form.Group>

      <Form.Group>
        <Form.Label>author</Form.Label>
        <Form.Control
        type='text'
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
         />
      </Form.Group>

      <Form.Group>
        <Form.Label>url</Form.Label>
        <Form.Control
        type='text'
        value={url}
        onChange={({ target }) => setUrl(target.value)}
         />
      </Form.Group>
      <Button variant="primary" type="submit">Submit</Button>
    </Form>)
})

export default AdBlog