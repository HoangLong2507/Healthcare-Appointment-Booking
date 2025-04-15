import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CDN_cloud_name,
  api_key: process.env.CDN_api_key,
  api_secret: process.env.CDN_api_secret,
});

export default cloudinary;