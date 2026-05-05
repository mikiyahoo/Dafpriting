import { v2 as cloudinary } from "cloudinary";
import { CloudinaryImageOptions } from "@/types";

function getCloudinaryConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Missing Cloudinary environment variables");
  }

  return { cloudName, apiKey, apiSecret };
}

export function getCloudinaryUrl(
  publicId: string,
  options: CloudinaryImageOptions = {}
): string {
  const {
    width,
    height,
    quality = "auto",
    format = "auto",
    crop = "fill",
  } = options;

  const transformations: string[] = ["f_" + format, "q_" + quality];

  if (width) transformations.push("w_" + width);
  if (height) transformations.push("h_" + height);
  if (crop && (width || height)) transformations.push("c_" + crop);

  const transformationString = transformations.join(",");
  const { cloudName } = getCloudinaryConfig();

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformationString}/${publicId}`;
}

export async function uploadImage(
  file: Buffer,
  folder: string = "radiance"
): Promise<{ public_id: string; url: string }> {
  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();

  const cld = cloudinary;
  cld.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  return new Promise((resolve, reject) => {
    cld.uploader
      .upload_stream(
        {
          folder,
          resource_type: "image",
          overwrite: true,
        },
        (error, result) => {
          if (error || !result) {
            reject(error || new Error("Upload failed"));
          } else {
            resolve({
              public_id: result.public_id,
              url: result.secure_url,
            });
          }
        }
      )
      .end(file);
  });
}
