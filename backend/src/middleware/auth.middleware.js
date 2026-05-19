import { getAuth } from "@clerk/express";

export function requireUser(req, res, next) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  next();
}