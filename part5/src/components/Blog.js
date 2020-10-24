import React from 'react'
import TogglableBlog from './TogglableBlog'

const Blog = React.forwardRef(({ blog, hendleLikes, handleDelete }, ref) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyle} className='blog' >
      <TogglableBlog buttonLabel='view' content={`${blog.title} ${blog.author}`} ref={ref} >
        {blog.title}<br/>
        {blog.url}<br/>
        likes {blog.likes} <button id='like' onClick={() => hendleLikes(blog)}>like</button><br/>
        {blog.author}<br/>
        <button id='delete' style={{ backgroundColor:'#4c6bf4' }} onClick={() => handleDelete(blog)} >delete</button>
      </TogglableBlog>
    </div>
  )
})

export default Blog
