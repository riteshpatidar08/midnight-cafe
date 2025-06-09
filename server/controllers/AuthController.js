
import User from '../models/user.js'
import admin from 'firebase-admin'
export const signup = (req,res) => {
    try {
        //req.body 
        //User.create command
        //password hash before save
    } catch (error) {
        
    }
}

export const login = (req ,res) => {
    try {
       //req.body
       //password hash bcrypt.compare
       //token genrate jwt 
       //res.cookie 
    } catch (error) {
        
    }
}

export const authenticateGoogleLogin = async(req,res) => {
  console.log(req.body)
    const decoded = await admin.auth().verifyIdToken(idToken) ;
    console.log(decoded)

}