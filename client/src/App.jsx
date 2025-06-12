import React from 'react';
import { auth, googleAuthProvider } from './config/firebase.js';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { Route, Routes } from 'react-router-dom';
import Hompage from './pages/Hompage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ProtectRoutes from './components/ProtectRoutes.jsx';
import Login from './pages/Login.jsx';
import OpenRoutes from './components/OpenRoutes.jsx';
import { Button } from './components/ui/button.js';


function App() {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const idToken = await result.user.getIdToken();

      axios
        .post('http://localhost:3000/api/auth/verify', {
          idToken,
        })
        .then((data) => {
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* <button onClick={signInWithGoogle}>Sign in with google</button> */}

      <Routes>
        <Route element={<OpenRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/" element={<Hompage />} />
        <Route element={<ProtectRoutes role={['admin', 'customer']} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
