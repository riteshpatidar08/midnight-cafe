import React from 'react';
import { auth, googleAuthProvider } from './config/firebase.js';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';

function App() 
{

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
    const idToken = await result.user.getIdToken();

    axios.post('http://localhost:3000/api/auth/verify', {
      idToken,
    }).then((data)=>{
      console.log(data)
    })
   
    } catch (error) {
      console.log(error)
    }
    
  };

  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with google</button>
    </div>
  );
}

export default App;
