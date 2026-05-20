import { getAuth } from "@clerk/express";

export function requireUser(req, res, next) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    next();
  } catch (err) {
    console.error("AUTH MIDDLEWARE ERROR:");
    console.error(err);

    return res.status(500).json({
      error: "Authentication failed",
    });
  }
}