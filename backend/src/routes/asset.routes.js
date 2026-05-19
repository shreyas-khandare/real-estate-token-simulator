import express from "express";

import {
  createAssetHandler,
  listAssets,
  getAssetHandler,
} from "../controllers/asset.controller.js";

import { requireUser } from "../middleware/auth.middleware.js";

const router = express.Router();

// Protected route
router.post("/", requireUser, createAssetHandler);

// Public routes
router.get("/", listAssets);
router.get("/:id", getAssetHandler);

export default router;