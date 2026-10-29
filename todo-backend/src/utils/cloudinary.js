import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});


const uploadOnCloudinary = async (localfilePath) => {
    try {
        if (!localfilePath) {
            return null
        }

        const response = await cloudinary.uploader.upload(localfilePath, {
            resource_type: "auto",
            folder: 'todoApp/users'
        })
        fs.unlinkSync(localfilePath)
        return response


    } catch (error) {
        fs.unlinkSync(localfilePath) // remove the locally saved temporary file as the upload operation got failed
        return null
    }
}

const deleteFromCloudinary = async (publicId) => {
    try {
        const resp = await cloudinary.uploader.destroy(publicId)
        return resp
    } catch (error) {
        return error
    }
}

export { uploadOnCloudinary, deleteFromCloudinary }
