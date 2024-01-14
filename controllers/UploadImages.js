const multer = require('multer');
const fs = require('fs-extra')
const cloudinary = require('cloudinary');

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

const upload = multer({
    storage,
})



const addimage = () => {
    return new Promise((reslove, reject) => {
        fs.readdirSync("./public/image").forEach((file) => {
            cloudinary.v2.uploader.upload(`./public/image/${file}`, (error, result) => {
                // console.log("res--->", result, error);
                fs.remove(`./public/image/${file}`, err => {
                    if (err) {
                        reject(err)

                    }
                })
                // console.log("url", result)
                if (error) {
                    reject(error)
                } else {
                    reslove(result.url)
                }


            })
        });
    })
}


module.exports = { upload, addimage }