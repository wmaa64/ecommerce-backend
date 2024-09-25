import express from 'express';
import { getUsers, registerUser,loginUser,getUserProfile, updateUserProfile} from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// routes/userRoutes.js
router.get('/', getUsers);
router.post('/', registerUser);    // Register a user
router.post('/login', loginUser);  // User login
router.get('/profile', protect, getUserProfile); // Get user profile (protected)
router.put('/profile', protect, updateUserProfile); // Update user profile (protected)

export default router;
