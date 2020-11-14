import blogService from '../services/blogs'
import { setNotification } from './msgReducer'

const sortBlogs = (blogs) => blogs.sort((blogA, blogB) => blogB.likes-blogA.likes)

export const initBlogs = () =>{
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({type: 'INITBLOGS', data: blogs})
    }
}
export const addBlog = (blogToAdd) => {
    return async dispatch => {
        const newBlog = await blogService.create(blogToAdd)
        dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'green'))
        dispatch({ type: 'ADD', data: newBlog})
    }
}

export const deleteBlog = (blog) => {
    return async dispatch => {
        await blogService.remove(blog.id)
        dispatch(setNotification(`The blog ${blog.title} have been deleted`, 'green'))
        dispatch({ type: 'DELETE', data: blog.id })
    }
}

export const likeBlog = (blogToUpdate) => {
    return async dispatch => {
        const updateBlog = await blogService.update(blogToUpdate)
        dispatch(setNotification(`now ${updateBlog.title} have ${updateBlog.likes} likes!`, 'green'))
        dispatch({type: 'UPDATE', data: updateBlog})
    }
}

export const addCommet = (comment,blogToUpdate) => {
    return async dispatch => {
        const tmpBlog = {...blogToUpdate, comments: blogToUpdate.comments.concat(comment)}
        const updateBlog = await blogService.update(tmpBlog)
        dispatch(setNotification(`the comment: ${comment} is added to the blog ${updateBlog.title}`))
        dispatch({type: 'UPDATE', data: updateBlog})
    }
}

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'INITBLOGS' :
            return sortBlogs(action.data)
        case 'ADD' :
            return sortBlogs(state.concat(action.data))
        case 'DELETE' :
            return sortBlogs(state.filter((b)=> b.id!==action.data))
        case 'UPDATE' :
            return sortBlogs(state.map((b)=> b.id===action.data.id ? action.data : b))
        default : return state
    }
}

export default blogReducer