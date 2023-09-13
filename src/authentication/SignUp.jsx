import React, {useRef, useState} from 'react'
import {Card, Form, Button, Alert} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { auth } from '../firebase'
import { Link, useNavigate } from 'react-router-dom'
import CenteredContainer from '../components/CenteredContainer'
const SignUp = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const {signUp,currentUser} = useAuth()
        // console.log(useAuth());  

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value)
        {
            return setError("Passwords do not match!")
        }
        try {
            setError('')
            setLoading(true)
            await signUp( emailRef.current.value, passwordRef.current.value)
            navigate('/')
        } catch {
            setError('Failed to create an account!')
        }

        setLoading(false)
        
    }
    
  return (
    <CenteredContainer>
      <Card className='p-4'>
        <Card.Body>
            <h2 className='text-center mb-4'>Sign Up</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            {currentUser && currentUser.email}
            {console.log(currentUser && currentUser.email)}
        
        <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' required ref={emailRef} />
            </Form.Group>
       
       
            <Form.Group id='passowrd'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' required ref={passwordRef} />
            </Form.Group>
       
       
            <Form.Group id='password-confirm'>
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type='password' required ref={passwordConfirmRef} />
            </Form.Group>
            <Button disabled={loading} type="submit" className='w-100 mt-4'>Sign Up</Button>
        </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already Have An Account? <Link to='/login'>Log In</Link>
      </div>
    </CenteredContainer>
  )
}

export default SignUp
