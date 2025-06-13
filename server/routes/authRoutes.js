import express from 'express' ;
import { authenticateGoogleLogin, login,signup, verifyUser } from '../controllers/AuthController.js';
import verify from '../middleware/verify.js';
const router = express.Router() ;


router.post('/login' , login ) ;
router.post('/signup' , signup) 
router.post('/verify-google' , authenticateGoogleLogin )
router.post('/verify' , verify , verifyUser )



export default router ;