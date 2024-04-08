import { v2 as cloudinary } from "cloudinary"
import fs from "fs"


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFolePath) => {
    try {
        if (!localFolePath) {
            return null;
        }
        //uplord file in cloud
        const response = await cloudinary.uploader.upload(localFolePath, {
            // auto matlab koi bhi type ki file ho 
            resource_type: "auto"
        })
        // file has been uplorded
        console.log("file is uploraded")
        console.log(response.url)
        return response;
    } catch (error) {
        fs.unlinkSync(localFolePath); // remove the locel save temprary file
        return null;
    }
}


export { uploadOnCloudinary }