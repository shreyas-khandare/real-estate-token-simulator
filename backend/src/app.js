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
    "http://localhost:5173",
    "http://localhost:3000",
    process.env.FRONTEND_URL
  ],
  credentials: true,
}));

// JSON
app.use(express.json());

// Routes
app.use("/assets", assetRoutes);
app.use(tokenRoutes);
app.use(portfolioRoutes);
app.use(insightRoutes);

// Health / root
app.get("/", (req, res) => {
  res.send("Asset simulator backend running");
});

export default app;
