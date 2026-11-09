// database.ts
// Connects to MongoDB using the MONGO_URI from  the .env file
// connectDB() opens the connection to mongoDB with the  address from .env .server .ts calls it before the API starts

import mongoose from "mongoose";
import { env } from "./env";
// step 2: connect to mongoDB
export const connectDB = async () => {
  const connection = await mongoose.connect(env.mongoUri);
  console.log(`mongoDB connected: ${connection.connection.host}`);
};

// step3:create the expressn app  -> server/src/app.ts
