// sever.ts
// The starting point of the API: connect to MongoDB, then start listening for requests.

import { connectDB } from "./config/database";
import { env } from "./config/env";
import app from "./app";

// step6: start the server
// the starting point: connect to MongoDB first, then start listening on the port. If the database cant be reached, show the error and stop

const startServer = async () => {
  try {
    await connectDB(); // uses MONGO_URI from the  .env file

    app.listen(env.port, () => {
      console.log(`QuickCart API running on /http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error("could not connect to MongoDB:", (error as Error).message);
    process.exit(1);
  }
};

startServer();

// step7: (the category model) -> sever/src/model/category.ts