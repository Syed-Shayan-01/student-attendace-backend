const { addimage, upload } = require('../controllers/UploadImages');

const express = require('express');
const { AttendaceUser, getUser } = require('../controllers/Attendance');
const router = express.Router();

// router.post("/image", upload.single("file"), async (req, res) => {
//     try {
//         const image =  addimage();
//         console.log("res--->", image);
//         return res.status(201).send({ status: "201", image, })
//     } catch (err) {
//         console.log(err);
//         return res.status(401).send({ status: "401", message: err.message })
//     }

// })
router.post('/attendance', upload.single('image'),AttendaceUser);
router.get('/user', getUser)
module.exports = router;