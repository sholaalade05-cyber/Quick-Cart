// env.ts
// Reads the settings from the .env file in one place, so the rest of the code uses `env.port`, `env.mongouri`, etc

import dotenv from "dotenv";

dotenv.config({ quiet: true });

// STEP 1: Read the settings from .env
// All settings(port, database address, JWT secret...) are read from .env here, once, so the rest of the code uses env.port, env.mongoUri and so on.

// STEP 2: (connect  to MongoDB) -> server/config/database.ts

export const env = {
  port: Number(process.env.PORT) || 5000,
  mongoUri:
    process.env.MONGO_URI ||
    "mongodb+srv://aladefathia21_db_user:88QcnxjT86EoBQJw@cluster0.bnsi0pd.mongodb.net/quick cart",
  jwtSerect: process.env.JWT_SECRET || "dev-secret-change-me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "15d", // remain logged in for 15days
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  // The hidden demo panel (reset the data, move orders along) for  presentations.
  // on while developing (npm run dev...  runs the  .ts files); off the built site(npm start  run .js from  dist)
  // unless DEMO_MODE =true is set. DEMO_MODE =false always turns it  off

  demoMode: process.env.DEMO_MODE
    ? process.env.DEMO_MODE === "true"
    : __filename.endsWith(".ts"),

  // cloudinary stores the product photos(see config/cloudinary.ts ). empty = use  the  photo in client/public
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY  || "",
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET  ||  "",
};
