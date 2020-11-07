// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import {likeBlog, deleteBlog} from '../../reducers/blogReducer'
// import {setNotification} from '../../reducers/msgReducer'
// import TogglableBlog from '../togglable/TogglableBlog'

// const Blog = React.forwardRef(({ blog }, ref) => {

//   const dispatch = useDispatch()
//   const user = useSelector(state=>state.user)
//   const blogStyle = {
//     paddingTop: 10,
//     paddingLeft: 2,
//     border: 'solid',
//     borderWidth: 1,
//     marginBottom: 5
//   }

//   const hendleLikes = async (blog) => {
//     try{
//       dispatch(likeBlog(blog, user.id))
//       dispatch(setNotification(`now ${blog.title} have ${blog.likes+1} likes!`, 'green'))
//     }catch (exception){
//       console.log(exception)
//       dispatch(setNotification(exception.response, 'red'))
//     }
//   }

//   const handleDelete = async (blog) => {
//     if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
//       try{
//         console.log(blog)
//         dispatch(setNotification(`The blog ${blog.title} have been deleted`, 'green'))
//         dispatch(deleteBlog(blog.id))
//       }catch (exception){
//         dispatch(setNotification(exception.response.data.error, 'red'))
//       }
//     }
//   }

//   return(
//     <div style={blogStyle} className='blog' >
//       <TogglableBlog buttonLabel='view' content={`${blog.title} ${blog.author}`} ref={ref} >
//         {blog.title}<br/>
//         {blog.url}<br/>
//         likes {blog.likes} <button id='like' onClick={() => hendleLikes(blog)}>like</button><br/>
//         {blog.author}<br/>
//         <button id='delete' style={{ backgroundColor:'#4c6bf4' }} onClick={() => handleDelete(blog)} >delete</button>
//       </TogglableBlog>
//     </div>
//   )
// })

// export default Blog
