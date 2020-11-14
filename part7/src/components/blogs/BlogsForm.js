import React from 'react'
import { useSelector } from 'react-redux'
import TitleBlogForm from './TitleBlogForm'
import Togglable from '../Togglable'
import AdBlog from './AdBlog'
import { ListGroup } from 'react-bootstrap'

const BlogsForm = React.forwardRef((props,ref) => {

  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      <h1>blogs</h1>
      <Togglable buttonLabel="new blog" ref={ref} >
        <AdBlog ref={ref} /> <br/>
      </Togglable>
      <br/>
      <ListGroup variant="flush" >
        {blogs.map(blog => 
          <ListGroup.Item variant='light' ><TitleBlogForm key={blog.id} blog={blog} /></ListGroup.Item>
        )}
      </ListGroup>
    </div>)
})

export default BlogsForm


        // <Router>
        //   <Switch>
        //     <Route path={`${path}/:id`} >
        //     <div>
        //       {blogs.map(blog =>
        //       <Link style={padding} to={`/${url}/${blogs.id}`} >{blog.title}</Link>)}
        //     </div>
        //     </Route>
        //     <Route exact path={path}>
        //     <div>
        //       {blogs.map(blog =>
        //       <BlogForm key={blog.id} blog={blog} />)}
        //     </div>
        //     </Route>
        //   </Switch>
        // </Router>
        