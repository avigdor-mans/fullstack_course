import React, { useState, useEffect } from 'react'
import { Button, Card, FormControl, InputGroup, ListGroup } from 'react-bootstrap'
import { ArrowLeft, HandThumbsUp } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import {addCommet, likeBlog, deleteBlog} from '../../reducers/blogReducer'
import {setNotification} from '../../reducers/msgReducer'

const FullBlogForm = () => {
    const [comment, setComment] = useState('')

    const id = useParams().id
    const history = useHistory()
    const dispatch = useDispatch()
    const blog = useSelector(state => state.blogs.find(blog => blog.id === id))

    useEffect(() => {
      if (!blog)
        history.push('/')
    }, [blog, history])

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    
    const hendleLikes = async () => {
        try{
          dispatch(likeBlog({...blog, likes:blog.likes+1}))
        }catch (exception){
          dispatch(setNotification(exception.response, 'red'))
        }
    }
    
    const handleComment = (event) => {
      event.preventDefault()
        try{
            dispatch(addCommet(comment, blog))
            setComment('')
        }catch (exception){
            dispatch(setNotification(exception.response, 'red'))
        }
       
    }

    const handleDelete = async () => {
        if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
          try{
            dispatch(deleteBlog(blog))
            history.push('/blogs')
          }catch (exception){
            dispatch(setNotification(exception.response.data.error, 'red'))
          }
        }
    }
    return(
        <div style={blogStyle} className='blog'>
          <Link to='/blogs' > <ArrowLeft color="royalblue" size={40} /> </Link>
          <br/>
          <h2>{blog.title}</h2>
          <h3>By {blog.author}</h3>
          <br/>
          <p>
          {blog.url}
          likes: {blog.likes} <Button id='like' onClick={hendleLikes}><HandThumbsUp size={20} /></Button>
          <br/>
          added by {blog.user.name}
          </p>
          <br/>

          <div>
            <Card>
              <Card.Header as='h3'>comments</Card.Header>
              <Card.Body>
                <ListGroup>
                  {blog.comments.map(c=>(<ListGroup.Item>{c}</ListGroup.Item>))}
                </ListGroup>
              </Card.Body>
            </Card>
            <br/>
            <InputGroup>
              <FormControl
                type='text'
                placeholder='add your comment'
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
              />
              <Button variant='primary' onClick={handleComment}>Submit</Button>
            </InputGroup>
          </div>
          <br/>
          <Button variant='danger' onClick={handleDelete} >delete</Button>
        </div>
    )    
}

export default FullBlogForm