import User from '../models/user.js';
import admin from 'firebase-admin';
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
export const signup = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    console.log(password);
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: 'user already exists',
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);
    const userData = {
      email,
      name,
      phone,
      password: hashPassword,
    };
    const newUser = await User.create(userData);

    res.status(200).json({
      message: 'User successfully registered',
      data: newUser,
    });
  } catch (error) {}
};

export const login = async (req, res) => {
  try {
    //req.body
    console.log(req.body);
    const { email, password } = req.body;
    //password hash bcrypt.compare

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({
        message: 'Account not created , Please register and try again',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      res.status(404).json({
        message: 'Password donot match',
      });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email:user.email, role: user.role },
      'hello_string',
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 900000,
    });

    res.status(200).json({
      message  :"success"
    });

    //token genrate jwt
    //res.cookie
  } catch (error) {}
};

export const verifyUser = async (req, res) => {
  try {
    console.log('dummy', req.user);
    if (!req.user) {
      return res.status(401).json({
        authenticated: false,
        message: 'Unauthorized',
      });
    }

    res.status(200).json({
      authenticated: true,
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      role : req.user.role
    });
  } catch (error) {}
};

export const authenticateGoogleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;
    const decoded = await admin.auth().verifyIdToken(idToken);
    console.log(decoded);

    let user = await User.findOne({ email: decoded.email });
    console.log(user);
    if (!user) {
      user = new User({
        name: decoded.name,
        email: decoded.email,
      });
      await user.save();
    }
    console.log(user);
  } catch (error) {}
};


