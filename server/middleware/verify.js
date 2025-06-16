import jwt from 'jsonwebtoken';

const verify = (req, res, next) => {
  try {
   
    const token = req.cookies.token;
    console.log(token)

    if (!token) {
      return res.status(401).json({
        authenticated: false,
        message: 'No token found',
      });
    }

    const decoded =  jwt.verify(token, 'hello_string');
    console.log(decoded)
   req.user = decoded
    next();
  } catch (error) {}
};


export default verify