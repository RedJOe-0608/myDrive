import React, { useState } from 'react'
import {Alert, Button, Card} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import CenteredContainer from '../components/CenteredContainer'
const Profile = () => {
    const [error, setError] = useState()
    const {currentUser, logOut} = useAuth()
    const navigate = useNavigate()
    const  handleLogOut = async () => {
        setError('')
        try {
            await logOut()
            navigate('/login')
        } catch (error) {
            setError('Failed to log out: ' + error)
        }

    }
  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
        <h2 className='text-center mb-4'>Profile</h2>
        {error && <Alert variant='danger'>{error}</Alert>}
        <strong>Email: {currentUser.email}</strong>
        <Link to='/update-profile' className='btn btn-primary w-100 mt-3'>Update Profile</Link>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Button variant='link' onClick={handleLogOut}>Log Out</Button>
      </div>
    </CenteredContainer>
  )
}

export default Profile
