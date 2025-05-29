import jwt from 'jsonwebtoken';
import User from '../Models/UserMode.js'; // Make sure the file path and extension are correct

export const Authentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // First Step: Check the token starts with 'Bearer'
  if (authHeader && authHeader.startsWith('Bearer')) {
    const token = authHeader.split(' ')[1];

    try {
      // Second Step: Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ Fix key name

      // Third Step: Find the user by ID from decoded token
      const currentUser = await User.findById(decoded.id).select('-password'); // Optional: exclude password

      if (!currentUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Attach user to request
      req.user = currentUser;
      next(); // ✅ Continue to next middleware/controller

    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  } else {
    return res.status(401).json({ message: 'No token provided' });
  }
};
