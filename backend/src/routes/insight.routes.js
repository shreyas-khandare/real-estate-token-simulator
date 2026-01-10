import express from "express";
import { getPortfolioInsights } from "../controllers/insight.controller.js";

const router = express.Router();


router.get("/insights", getPortfolioInsights);

export default router;
