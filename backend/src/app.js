import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

import assetRoutes from "./routes/asset.routes.js";
import tokenRoutes from "./routes/token.routes.js";
import portfolioRoutes from "./routes/portfolio.routes.js";
import insightRoutes from "./routes/insight.routes.js";

const app = express();

// CORS
app.use(cors({
  origin: [
    "https://real-estate-token-simulator.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
    /\.vercel\.app$/,
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// JSON
app.use(express.json());

// Clerk middleware
app.use(clerkMiddleware());

// Routes
app.use("/assets", assetRoutes);
app.use(tokenRoutes);
app.use(portfolioRoutes);
app.use(insightRoutes);

// Health
app.get("/", (req, res) => {
  res.send("Asset simulator backend running");
});

export default app;