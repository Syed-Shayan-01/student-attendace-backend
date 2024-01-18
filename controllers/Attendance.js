const { Attendance } = require("../models/Attendance/attend");
// const { addimage } = require("./UploadImages");
const multer = require('multer');
const fs = require('fs-extra')
const path = require('path')
const cloudinary = require('cloudinary');
const filePath = path.join(process.cwd(), 'public', 'image')
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
});



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/image')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

exports.upload = multer({
    storage,
})
// const ImageUploader = async () => {
//     return new Promise((resolve, reject) => {
//         const files = fs.readdirSync("./public/image");
//         files.forEach((file) => {
//             cloudinary.v2.uploader.upload(`./public/image/${file}`, (error, result) => {
//                 if (error) {
//                     console.error(`Error uploading file ${file}:`, error);
//                     reject(error);
//                 } else {
//                     console.log(`File ${file} uploaded successfully`);
//                     fs.remove(`./public/image/${file}`, (err) => {
//                         if (err) {
//                             console.error(`Error removing file ${file}:`, err);
//                             reject(err);
//                         } else {
//                             resolve(result.url);
//                         }
//                     });
//                 }
//             });
//         })
//     })
// };




const AttendaceUser = async (req, res) => {
    try {
        const { name, email, password, course, phoneNumber } = req.body;
        // const ImageResult = await ImageUploader(image);
        // console.log("ImageResult:", ImageResult);

        const result = await cloudinary.v2.uploader.upload(`./public/image/${req.file.originalname}`, (err, result) => {
            if (err) {
                res.status(404).send({ status: 404, message: 'Image not upload in CLoudinary' })
            } else {
                console.log(result.url)
            }
        });
        console.log(result)
        const saveData = new Attendance({
            name,
            email,
            password,
            course,
            phoneNumber,
            image: result.url,
        });
        await fs.remove(`./public/image/${req.file.originalname}`, (err) => {
            if (err) {
                console.error(`Error removing file ${req.file.originalname}:`, err);
                reject(err);
            } else {
                resolve(result.url);
            }
        });
        const check = await Attendance.findOne({ email });

        if (check) {
            return res.status(404).send({ status: 404, message: 'User already exists' });
        }

        const response = await saveData.save();
        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ status: 500, message: 'Internal Server Error' });
    }
};

const getUser = async (req, res) => {
    try {

        const allUsers = await Attendance.find();

        return res.status(200).send(allUsers);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: 500, message: 'Internal Server Error' });
    }
}
module.exports = { AttendaceUser, getUser }
