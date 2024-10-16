const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUsername, updatePassword } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getUserProfile); 
router.post('/update-username', authMiddleware, updateUsername); 
router.put('/update-password', authMiddleware, updatePassword); 

module.exports = router;
