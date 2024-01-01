import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

export default new class CloudinaryConfig {
  upload() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
  }

  async destination(image: any) {
    try {
        const cloudinaryRes = await cloudinary.uploader.upload(
            "src/uploads" + image
        );
        return cloudinaryRes.secure_url;
    } catch (error) {
        console.log(error);
        throw error;
    }
  }
}();
