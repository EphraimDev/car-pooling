import upload from '../utils/cloudinary';

export const uploadImage = async (req, image='') => {
    let img = '';

    if (req.file) {
      await upload(req);

      img = req.body.imageURL !== undefined ? req.body.imageURL : image;
    }

    return img;
  }