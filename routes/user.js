const express = require('express');
const router = express.Router();

const { register, login, getMe, getAllUsers } = require('../controller/user');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/', getAllUsers);

module.exports = router;
