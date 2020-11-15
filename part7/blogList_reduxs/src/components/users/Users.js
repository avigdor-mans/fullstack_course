import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from "react-router-dom"

const Users = ({users}) => {

  return (
    <div>
      <h1>users</h1>
      <Table striped bordered hover variant="dark" size="sm" >
        <thead>
          <tr>
            <th>name</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u=>
            <tr key={u.id} >
              <th><Link to={`/users/${u.id}`}>{u.name}</Link></th>
              <th>{u.blogs.length}</th>
            </tr>)}
        </tbody>
      </Table>
    </div>
  )
}

export default Users