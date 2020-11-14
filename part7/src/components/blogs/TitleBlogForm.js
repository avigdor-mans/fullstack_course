import React from 'react'
import { Link } from 'react-router-dom'


const TitleBlogForm = ({ blog }) => {

  return (
      <div>
        <Link style={ {color:'black'} } to={`/blogs/${blog.id}`}> {`${blog.title} By ${blog.author}`} </Link>
        <br/>
      </div>
  )
}

export default TitleBlogForm
