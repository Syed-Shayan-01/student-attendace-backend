const express = require('express');
const { registerUser, findUser } = require('../controllers/auth');
const router = express.Router();


router.post('/signup', registerUser);
router.post('/login', findUser);

module.exports = router;