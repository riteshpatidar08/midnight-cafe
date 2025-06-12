import { response } from 'express';
import User from '../models/user.js';
import admin from 'firebase-admin';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const signup = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: 'user already exists',
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const userData = {
      email,
      name,
      phone,
      hashPassword,
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
    const { email, password } = req.body;
    //password hash bcrypt.compare

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({
        message: 'Account not created , Please register and try again',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(404).json({
        message: 'Password donot match',
      });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      'hello_string',
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
    });

    res.send('login successfull');

    //token genrate jwt
    //res.cookie
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
