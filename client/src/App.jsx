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
import Menu from './pages/Menu.jsx';

function App() {


  return (
    <div>
      {/* <button onClick={signInWithGoogle}>Sign in with google</button> */}

      <Routes>
        <Route element={<OpenRoutes />}>
          <Route path="/" element={<Hompage />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectRoutes roles={['admin', 'customer']} />}>
          <Route path="/menu" element={<Menu />} />
        </Route>

        <Route element={<ProtectRoutes roles={['admin']} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
