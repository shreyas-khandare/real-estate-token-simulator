import express from "express";
import { getPortfolio } from "../controllers/portfolio.controller.js";

const router = express.Router();

router.get("/portfolio", getPortfolio);

export default router;
