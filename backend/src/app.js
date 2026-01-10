import express from "express";
import cors from "cors";

import assetRoutes from "./routes/asset.routes.js";
import tokenRoutes from "./routes/token.routes.js";
import portfolioRoutes from "./routes/portfolio.routes.js";
import insightRoutes from "./routes/insight.routes.js";

const app = express();

// CORS
app.use(cors({
  origin: [
    "https://real-estate-token-simulator.vercel.app", // production
    "http://localhost:5173", // Vite local
    "http://localhost:3000", // CRA / Next local
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// JSON
app.use(express.json());

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
