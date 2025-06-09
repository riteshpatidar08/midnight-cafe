import React from 'react'
import {auth , googleAuthProvider} from './config/firebase.js' ;
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth';
function App() {

  const signInWithGoogle = async() => {
   const result = await signInWithPopup(auth,googleAuthProvider)
const idToken = await result.user.getIdToken()

 const res = await axios.post('http://localhost:3000/api/auth/verify' , {idToken})
  } 
  
  return (
    <div>
    <button onClick={signInWithGoogle}>Sign in with google</button>  
    </div>
  )
}

export default App
