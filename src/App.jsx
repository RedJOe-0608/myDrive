import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './components/google-drive/Dashboard'
import Login from './authentication/Login'
import SignUp from './authentication/SignUp'
import PrivateRoute from './authentication/PrivateRoute'
import ForgotPassword from './authentication/ForgotPassword'
import UpdateProfile from './authentication/UpdateProfile'
import Profile from './authentication/Profile'

function App() {
  const [count, setCount] = useState(0)

  return (
        <Router>
          <AuthProvider>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              
              {/* <Route path='/' element={<PrivateRoute><Dashboard /></PrivateRoute>} /> */}

              {/* profile */}
            
              <Route path='/user' element={<PrivateRoute><Profile  /></PrivateRoute> } />
              <Route path='/update-profile' element={<PrivateRoute><UpdateProfile /></PrivateRoute> } />
              <Route path='/folder/:folderId' element={<PrivateRoute><Dashboard /></PrivateRoute> } />

              {/* auth */}
              <Route path='/signup' element={<SignUp />} />
              <Route path='/login' element={<Login />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
            </Routes>
          </AuthProvider>
        </Router>
  )
}

export default App
