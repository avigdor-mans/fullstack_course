import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { ArrowLeft } from 'react-bootstrap-icons'
import { Link, useParams } from "react-router-dom"

const User = ({users}) => {
  const id = useParams().id
  const user = users.find(u => u.id === id)

  return(
    <Card>
      <Link to='/users'><ArrowLeft color="royalblue" size={40} /></Link>
      <Card.Header>
        {user.name}
      </Card.Header>
      <Card.Title>
        added blogs
      </Card.Title>
      <ListGroup>
        {user.blogs.map(b => 
          <ListGroup.Item key = {b.id}>{b.title}</ListGroup.Item>)}
      </ListGroup>
    </Card>
  )
}

export default User