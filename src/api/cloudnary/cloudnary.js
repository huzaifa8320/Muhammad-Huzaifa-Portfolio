import axios from "axios";

const upload_preset = process.env.UPLOAD_PRESET;
const cloudnary_Url = `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`;

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", upload_preset);

  try {
    const response = await axios.post(cloudnary_Url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.secure_url; // Cloudinary URL
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
};
