// notFound
// Runs when no route matches the request, and replies with a 404 message

import { Request, Response } from "express";

// step4: handle unkown URLs and errors
// runs when route matched: replies 404  as JSON. errorHANDLER.ts (same step) turns any thrown error into a JSON reply instead of crashing

export const notFound = (req: Request, res: Response) => {
  res
    .status(404)
    .json({ message: `Not found: ${req.method} ${req.originalUrl}` });
};

// step5: (join the routes and add a health check) -> server/src/routes/index.ts
