import express from "express";
import {
  createAssetHandler,
  listAssets,
  getAssetHandler,
} from "../controllers/asset.controller.js";

const router = express.Router();

router.post("/", createAssetHandler);
router.get("/", listAssets);
router.get("/:id", getAssetHandler);

export default router;
