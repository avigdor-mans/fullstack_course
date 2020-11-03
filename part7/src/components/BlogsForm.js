import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const blogsForm = React.forwardRef((ref) => {

    const blogs = useSelector(state => state.blogs)
    console.log(blogs)
    return blogs.map(blog =>
        <Blog key={blog.id} blog={blog} ref={ref} />
      )
})

export default blogsForm