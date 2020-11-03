import blogService from '../services/blogs'

const sortBlogs = (blogs) => blogs.sort((blogA, blogB) => blogB.likes-blogA.likes)

export const initBlogs = () =>{
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({type: 'INIT', data: blogs})
    }
}
export const addBlog = (blogToAdd) => {
    return async dispatch => {
        const newBlog = await blogService.create(blogToAdd)
        dispatch({ type: 'ADD', data: newBlog})
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch({ type: 'DELETE', data: id })
    }
}

export const likeBlog = (blogToUpdate, userId) => {
    return async dispatch => {
        const updateBlog = await blogService.update(blogToUpdate, userId)
        dispatch({type: 'UPDATE', data: updateBlog})
    }
}

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT' :
            return sortBlogs(action.data)
        case 'ADD' :
            return sortBlogs(state.concat(action.data))
        case 'DELETE' :
            return sortBlogs(state.filter((b)=> b.id!==action.data))
        case 'UPDATE' :
            return sortBlogs(state.map((b)=> b.id===action.data.id ? {...b, likes: b.likes+1} : b))
        default : return state
    }
}

export default blogReducer