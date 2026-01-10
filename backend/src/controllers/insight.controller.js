import { computePortfolio } from "../services/portfolio.service.js";
import { generateInsights } from "../services/insight-rules.service.js";
import { explainWithGemini } from "../services/gemini.service.js";

export async function getPortfolioInsights(req, res) {
  const portfolio = await computePortfolio();
  const rules = generateInsights(portfolio);

  let ai = null;

  try {
    const text = await explainWithGemini({
      portfolio,
      rules,
    });

    // structured response for frontend
    // later: can split into summary/patterns/factors if AI returns JSON
    ai = {
      summary: text,
    };
  } catch (err) {
    ai = { summary: "AI explanation unavailable." };
  }

  return res.json({
    rules: {
      riskLevel: rules.riskLevel,
      warnings: rules.warnings,
      keyNumbers: rules.keyNumbers,
    },
    ai,
  });
}
