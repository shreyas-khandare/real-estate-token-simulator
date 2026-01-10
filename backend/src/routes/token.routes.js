import express from "express";
import { tokenizeAsset, buyTokens, viewOwnership, getMarket } from "../controllers/token.controller.js";

const router = express.Router();

router.post("/assets/:id/tokenize", tokenizeAsset);
router.post("/tokens/:tokenId/buy", buyTokens);
router.get("/tokens/:tokenId/ownership", viewOwnership);
router.get("/market", getMarket);

export default router;
