import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import setNotification from '../../reducers/msgReducer'
import userLogout from '../../reducers/userReducer'

const Logout = () => {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogout = () => {
        dispatch(setNotification(`goodbye ${user.name}`, 'green'))
        dispatch(userLogout())
        history.push('/')    
    }

    return (<p>{user ? user.name : ''} logged-in <Link to='/'><button onClick={handleLogout} >logout</button></Link></p>)

}

export default Logout