import * as fs from "node:fs";
import {
  CLOUDINARY_MISSING,
  isCloudinaryReady,
  PHOTO_FOLDER,
  photoUri,
  uploadedPhotoId,
  uploadPhoto,
} from "../config/cloudinary";
import path from "path";

const PHOTO_TYPES = [".jpg", ".jpeg", ".png", ".webp"];

const uploadImages = async () => {
  const folder = process.argv[2];

  // 1. check we have everything before we start
  if (!folder) {
    console.error(
      'say where the photos are: npm run upload images -- "C:/path/to/photos',
    );
    process.exit(1);
  }

  if (!isCloudinaryReady) {
    console.error(CLOUDINARY_MISSING);
    process.exit(1);
  }

  if (!fs.existsSync(folder)) {
    console.error(`Folder not found: ${folder}`);
    process.exit(1);
  }

  //   2.list the photo files in the folder
  const files = fs.readdirSync(folder).filter((file) => {
    return PHOTO_TYPES.includes(path.extname(file).toLowerCase());
  });

  console.log(`Uploading ${files.length} photos to cloudinary....`);
  //   3. upload them one at a time (simple, and kind to a slow connection)
  let upload = 0;
  let failed = 0;

  for (const file of files) {
    // "smart-watch-ultra-1.jpeg -> "smart-watch-ultra-1(trim revives stray spaces)
    const name = path.parse(file).name.trim().toLowerCase();
    const bytes = fs.readFileSync(path.join(folder, file));

    try {
      const publicId = await uploadPhoto(bytes, `${PHOTO_FOLDER}/${name}`);
      upload++;
      console.log(`${upload}/${files.length} ${photoUri(publicId)}`);
    } catch (error) {
      failed++;
      console.error(`failed: ${file} -> ${(error as Error).message})`);
    }
  }
  console.log(`done: ${upload} uploaded, ${failed} failed.`);
};

uploadImages();
