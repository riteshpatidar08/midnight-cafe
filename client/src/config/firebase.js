import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyBgUuUTT88p6J3aoppviz4nltYo-28T89Q',
  authDomain: 'midnight-cafe-3ff7e.firebaseapp.com',
  projectId: 'midnight-cafe-3ff7e',
  storageBucket: 'midnight-cafe-3ff7e.firebasestorage.app',
  messagingSenderId: '208623115266',
  appId: '1:208623115266:web:59a6f50671e98fb89b9b1b',
  measurementId: 'G-5MCDJKGKZG',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
