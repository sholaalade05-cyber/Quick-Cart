// app.ts
// create the express app: settings first, then all the /api routs, then the "not found " and error handlers.
// it does not start listening: server.ts does that

import express from "express";
import { env } from "./config/env";
// the Express app : allow the website to call the us(CORS), read JSON bodies, server uploaded photos, put every route under /api , then the 404 and error handlers .
// step3: create the espress app
const app = express();
app.use(express.json());

// step4:(handle unkown URLS and errors )-> server/src/middle/notfound.ts
export default app;
