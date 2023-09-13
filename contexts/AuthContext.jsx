import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../src/firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateCurrentUser, updateEmail, updatePassword } from 'firebase/auth'
const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
}

const logOut = () => {
  return signOut(auth)
}

const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email)
}

const updateUserEmail = (email) => {
  return updateEmail(auth.currentUser, email)
}
const updateUserPassword = (password) => {
  return updatePassword(currentUser, password)
}

// const signUp =  async (email,password) => {
//   try {
//     await createUserWithEmailAndPassword(auth, email,password)
//   } catch (error) {
//     console.log(error);
//   } 
// }

// const signIn = async (email, password) => {
//   try {
//     await signInWithEmailAndPassword(auth, email, password);
    
//   } catch (error) {
//     console.log(error);
//   }
// }




export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user)
        })

        return unsubscribe
    },[])
    
    const value = {
        currentUser,
        signUp,
        signIn,
        logOut,
        resetPassword,
        updateUserEmail,
        updateUserPassword   
    }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}


