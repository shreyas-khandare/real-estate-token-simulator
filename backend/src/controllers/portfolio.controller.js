import { computePortfolio } from "../services/portfolio.service.js";

export async function getPortfolio(req, res) {
  const portfolio = await computePortfolio();
  res.json(portfolio);
}
