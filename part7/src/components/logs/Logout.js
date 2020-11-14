import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { setNotification } from '../../reducers/msgReducer'
import { userLogout } from '../../reducers/userReducer'

const Logout = () => {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const history = useHistory()
    const handleLogout = () => {
        dispatch(userLogout())
        dispatch(setNotification(`goodbye ${user.name}`, 'green'))
        history.push('/')
    }
    return user !== null ? 
        <em>logged-in {user.name} <Button variant='dark' onClick={handleLogout} >logout</Button></em> 
        : null

}

export default Logout