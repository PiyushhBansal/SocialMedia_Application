import { v2 as cloudinary } from "cloudinary";

const uploadFile = async (file) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });

    // Use resource_type: "auto" so Cloudinary accepts both images and videos
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error", error);
    return null;
  }
};

export default uploadFile