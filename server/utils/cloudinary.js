import cloudinary from 'cloudinary';
import config from '../config/cloudinary';

const upload = async (req) => {

    cloudinary.config({
      cloud_name: config.cloud_name,
      api_key: config.api_key,
      api_secret: config.api_secret,
    });
  
    const result = await cloudinary.uploader.upload(req.file.path);
  
    req.body.imageId = result.public_id;
    req.body.imageURL = result.secure_url;
    
  return;
};

export default upload;
