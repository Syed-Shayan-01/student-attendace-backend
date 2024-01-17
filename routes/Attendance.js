const {  upload } = require('../controllers/UploadImages');

const express = require('express');
const { AttendaceUser, getUser } = require('../controllers/Attendance');
const router = express.Router();

router.post('/attendance', AttendaceUser);
router.get('/user', getUser)
module.exports = router;