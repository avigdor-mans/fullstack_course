import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom"
import BlogForm from './BlogForm'

const BlogsForm = () => {
  const { path, url } = useRouteMatch();

  const padding = {
    paddingRight: 5
  }
    const blogs = useSelector(state => state.blogs)
    console.log(blogs)
    try{
      return (
        <Router>
          <Switch>
            <Route path={`${path}/:id`} >
            <div>
              {blogs.map(blog =>
              <Link style={padding} to={`/${url}/${blogs.id}`} >{blog.title}</Link>)}
            </div>
            </Route>
            <Route exact path={path}>
            <div>
              {blogs.map(blog =>
              <BlogForm key={blog.id} blog={blog} />)}
            </div>
            </Route>
          </Switch>
        </Router>
        
        )
    }catch(error){
      console.log(error)
      return null
    }

}

export default BlogsForm