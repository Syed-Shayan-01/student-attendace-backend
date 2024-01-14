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
const ImageUploader = async () => {
    return new Promise((resolve, reject) => {
        fs.readdirSync("./public/image").forEach((file) => {
            cloudinary.v2.uploader.upload(`./public/image/${file}`, (error, result) => {

                fs.remove(`./public/image/${file}`, err => {
                    if (err) {
                        reject(err)

                    }
                })
                if (error) {
                    reject(error)
                }
                else {
                    resolve(result.url)
                }


            })
        });
    });
};


const AttendaceUser = async (req, res) => {
    try {
        const { name, email, password, course, phoneNumber, image } = req.body;
        const ImageResult = ImageUploader(image);
        console.log(ImageResult)
        const saveData = new Attendance({
            name,
            email,
            password,
            course,
            phoneNumber,
            image: ImageResult,
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
