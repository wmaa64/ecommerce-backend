// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
  let token;

  try {
    // Check if token exists in the authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      // Extract the token from the Bearer header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID from the decoded token
      req.user = await User.findById(decoded.id).select('-password'); // Exclude the password from the user object

      // Call the next middleware or route handler
      next();
    } else {
      res.status(401).json({ message: 'Not authorized, no token' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
 
export default protect;