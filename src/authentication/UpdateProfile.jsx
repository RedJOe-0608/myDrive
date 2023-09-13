import React, {useRef, useState} from 'react'
import {Card, Form, Button, Alert} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { auth } from '../firebase'
import { Link, useNavigate } from 'react-router-dom'
import CenteredContainer from '../components/CenteredContainer'
const UpdateProfile = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const {currentUser, updateUserEmail, updateUserPassword} = useAuth()
        // console.log(useAuth());  

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        if(passwordRef.current.value !== passwordConfirmRef.current.value)
        {
            return setError("Passwords do not match!")
        }

        const promises = []
        if(emailRef.current.value !== currentUser.email){
          promises.push(updateUserEmail(emailRef.current.value))
        }

        if(passwordRef.current.value){
          promises.push(updateUserPassword(passwordRef.current.value))
        }

        console.log(promises);

        Promise.all(promises).then(() => {
          navigate('/user')
        }).catch(() => setError("Failed To Update Account")).finally(() => {
          setLoading(false)
        });
      }
        
    
  return (
    <CenteredContainer>
      <Card className='p-4'>
        <Card.Body>
            <h2 className='text-center mb-4'>Update Profile</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            {currentUser && currentUser.email}
            {console.log(currentUser && currentUser.email)}
        
        <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' required defaultValue={currentUser.email} ref={emailRef} />
            </Form.Group>
       
       
            <Form.Group id='passowrd'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Leave Blank To Keep The Same' ref={passwordRef} />
            </Form.Group>
       
       
            <Form.Group id='password-confirm'>
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type='password'  placeholder='Leave Blank To Keep The Same' ref={passwordConfirmRef} />
            </Form.Group>
            <Button disabled={loading} type="submit" className='w-100 mt-4'>Update Profile</Button>
        </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
      <Link to='/user'>Cancel</Link>
      </div>
    </CenteredContainer>
  )
}

export default UpdateProfile
