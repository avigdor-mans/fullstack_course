import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import BlogForm from './BlogForm'

const BlogsForm = () => {
  const padding = {
    paddingRight: 5
  }
    const blogs = useSelector(state => state.blogs)
    console.log(blogs)
    return (
      <Router>
        <Switch>
          <Route path={`/blogs/:id`} >
            {blogs.map(blog =>
            <Link style={padding} to={`/blogs/${blogs.id}`} >{blog.title}</Link>)}
          </Route>
          <Route path='/blogs'>
            {blogs.map(blog =>
            <BlogForm key={blog.id} blog={blog} />)}
          </Route>
        </Switch>
      </Router>
      
      )
}

export default BlogsForm