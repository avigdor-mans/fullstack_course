import usersService from '../services/users'

export const getUsers = () =>{
    return dispatch =>{
        dispatch({type: 'GETUSERS'})
    }
}

export const initUsers = () => {
    return async dispatch => {
        const users = await usersService.getAll()
        console.log("##########",users)
        dispatch({type: 'INITUSERS', data: users})
    }
}

const userReducer = (state=[], action) =>{
    console.log(action)
    switch (action.type) {
        case 'GETUSERS' : 
            return state
        case 'INITUSERS' :
            return action.data
        default : return state
    }
}

export default userReducer