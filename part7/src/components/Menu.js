import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from "react-router-dom"
import Logout from './logs/Logout'

const Menu = () => {

  return (
    <Navbar bg="primary" variant="dark" >

      <Nav>
        <Navbar.Brand as={Link} to='/' >
          blogs
        </Navbar.Brand>

        <Navbar.Brand as={Link} to='/users' >
          users
        </Navbar.Brand>
      </Nav>

      <Nav>
        <Navbar.Text>
          <Logout />
        </Navbar.Text>
      </Nav>

    </Navbar>
  )
}

export default Menu