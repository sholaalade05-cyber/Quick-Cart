// routes/index.ts
// joins all the route file together app.ts puts these under /api

import { Router } from "express";

// step5: join the  routes and the route files. app.ts mounts it at /api, so a rout like eg  "/products" becomes /api/products

const router = Router();

// GET /api/health: a quick check that the api  is running
router.get("health", (_req, res) => {
  res.json({ status: "ok", message: "QuickCart API is running " });
});

// step6: start the server -> server/src/server.ts
