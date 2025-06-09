import express from 'express' ;
import { authenticateGoogleLogin, login,signup } from '../controllers/AuthController.js';
const router = express.Router() ;


router.post('/login' , login ) ;
router.post('/signup' , signup) 
router.post('/verify' , authenticateGoogleLogin )



export default router ;