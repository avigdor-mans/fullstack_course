import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link, useParams, useHistory } from "react-router-dom"
import blogs from '../services/blogs'

const Users = () => {
    const [user, setUser] = useState(null)
    const users = useSelector(state => state.users)
    return (
        <Router>
        <Switch>
        <Route path='/users'>
                <a2>Users</a2>
                <table>
                    <tr>
                        <th>users</th>
                        <th>blogs created</th>
                    </tr>
                    {users.map(u=>
                        <tr>
                            <Link onClick={()=>setUser(u)} to={`/users/${u.id}`}><th>{u.name}</th></Link>
                            <th>{u.blogs.length}</th>
                        </tr>)}
                </table>
            </Route>
            <Route path='/users/:id'>
                <a2>{user?user.name:null}</a2>
                <a3>added blogs</a3>
                <ul>
                    {user.blogs(blogId=><li>{blogs.find(b=>b.is=blogId).title}</li>)}
                </ul>
                <Link to='/users'><button>cancel</button></Link>
            </Route>

           
        </Switch>
        </Router>
        )
}

export default Users