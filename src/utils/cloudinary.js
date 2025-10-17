import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NANE, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET
});
 
const uploadOnCloudinary = async (localfilepath) =>{
    try{
      if(!localfilepath) return null
        // upload the file the cloudinary
       const response = await cloudinary.uploader.upload(localfilepath,{
          resource_type:"auto"
        })
        // file has been uploaded sucessfully
        console.log('File is uploaded on cloudinary',response,response.url)
        return response
    }catch(error){
        console.log( `error: ${error}`)
        fs.unlinkSync(localfilepath);
        /* remove the locally saved temporary file as the upload operation got faild */
        return null
    }
}
export {uploadOnCloudinary}
