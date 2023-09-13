import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const NavbarComponent = () => {
  return (
    <Navbar bg='light' expand="sm" className='justify-content-between p-3'>
      <Navbar.Brand as={Link} to='/'>
       <h4> My Drive</h4>
      </Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to="/user">Profile</Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default NavbarComponent
