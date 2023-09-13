import React, {useRef, useState} from 'react'
import {Card, Form, Button, Alert} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { auth } from '../firebase'
import { Link } from 'react-router-dom'
import CenteredContainer from '../components/CenteredContainer'
const ForgotPassword = () => {
    const emailRef = useRef()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    

    const {currentUser, resetPassword} = useAuth()
        // console.log(useAuth());  

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword( emailRef.current.value)
            setMessage("Please check your email for further instructions")
        }catch {
            setError('Failed to Rest Password!')
        }

        setLoading(false)         
        
    }
    
  return (
    <CenteredContainer>
      <Card className='p-4'>
        <Card.Body>
            <h2 className='text-center mb-4'>Forgot Password?</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            {message && <Alert variant='success'>{message}</Alert>}
            {currentUser && currentUser.email}
            {console.log(currentUser && currentUser.email)}
        
        <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' required ref={emailRef} />
            </Form.Group>
       
            <Button disabled={loading} type="submit" className='w-100 mt-4'>Reset Password</Button>
        </Form>
        <div className='w-100 text-center mt-3'>
            <Link to='/login'>Log In</Link>
        </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need An Account? <Link to="/signup" >Sign Up</Link>
      </div>
    </CenteredContainer>
  )
}

export default ForgotPassword
