import React, {useRef, useState} from 'react'
import {Card, Form, Button, Alert} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { auth } from '../firebase'
import { Link, useNavigate } from 'react-router-dom'
import CenteredContainer from '../components/CenteredContainer'
const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const {signIn,currentUser} = useAuth()
        // console.log(useAuth());  

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await signIn( emailRef.current.value, passwordRef.current.value)
            navigate('/')
        }catch {
            setError('Failed to Log In!')
        }

        setLoading(false)         
        
    }
    
  return (
    <CenteredContainer>
      <Card className='p-4'>
        <Card.Body>
            <h2 className='text-center mb-4'>Log In</h2>
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
       
       
            <Button disabled={loading} type="submit" className='w-100 mt-4'>Log In</Button>
        </Form>
        <div className='w-100 text-center mt-3'>
            <Link to='/forgot-password'>Forgot Password?</Link>
        </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need An Account? <Link to="/signup" >Sign Up</Link>
      </div>
    </CenteredContainer>
  )
}

export default Login
