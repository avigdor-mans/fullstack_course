import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {addCommet, likeBlog, deleteBlog} from '../../reducers/blogReducer'
import {setNotification} from '../../reducers/msgReducer'
import blogs from '../../services/blogs'

const BlogForm = ({blog}) => {
    const [comment, setComment] = useState('')
    // user = useSelector(state=>state.user)
    const dispatch = useDispatch()
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const hendleLikes = async () => {
        try{
          dispatch(likeBlog(blog))
        }catch (exception){
          console.log(exception)
          dispatch(setNotification(exception.response, 'red'))
        }
    }
    
    const handleComment = () => {
        try{
            dispatch(addCommet(comment, blog))
            setComment('')
        }catch (exception){
            console.log(exception)
            dispatch(setNotification(exception.response, 'red'))
        }
       
    }

    const handleDelete = async () => {
        if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
          try{
            dispatch(deleteBlog(blog))
          }catch (exception){
            dispatch(setNotification(exception.response.data.error, 'red'))
          }
        }
    }
    return(
        <div style={blogStyle} className='blog'>
            <a2>{`${blog.title} ${blog.author}`}</a2>
            {blog.url}<br/>
            likes {blog.likes} <button id='like' onClick={hendleLikes}>like</button><br/>
            added by {blog.user.name}
            <br/>
            <a3>comments</a3>
            <input value={comment} onChange={(e)=>setComment(e.target.value)} placeholder='add your comment' type='text' /><button onClick={handleComment}>add comment</button>
            <br/>
            <ul>
                {blog.comments ? blog.comments.map(c=>(<li>c</li>)) : null}
            </ul>
            <br/>
            <button id='delete' style={{ backgroundColor:'#4c6bf4' }} onClick={handleDelete} >delete</button>
        </div>
    )    
}

export default BlogForm