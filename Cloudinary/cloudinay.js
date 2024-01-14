// const cloudinary = require('cloudinary').v2;
// const fs = require('fs')

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.KEY,
//     api_secret: process.env.CLOUD_SECRET
// });

// const uploadCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) {
//             return null
//         }
//         //file upload function
//         const response = cloudinary.uploader.upload(localFilePath, {
//             resource_type: 'auto',
//         });
//         // if file uploaded successfuly
//         console.log(response.url)
//         return response;
//     } catch (err) {
//         fs.unlinkSync(localFilePath) //remove the localy save temorary file
//         return null
//     }
// }