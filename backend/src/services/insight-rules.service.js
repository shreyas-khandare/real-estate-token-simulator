export function generateInsights(portfolio) {
  const warnings = [];
  let riskLevel = "low";

  // Risk level classification
  if (portfolio.portfolioRisk >= 2.5) {
    riskLevel = "high";
  } else if (portfolio.portfolioRisk >= 1.8) {
    riskLevel = "moderate";
  }

  // Asset concentration (>40%)
  for (const asset of portfolio.byAsset) {
    const pct = asset.exposure / portfolio.totalExposure;
    if (pct > 0.4) {
      warnings.push(
        `High concentration in asset "${asset.name}" (${Math.round(pct * 100)}%)`
      );
    }
  }

  // City concentration (>60%)
  for (const city in portfolio.byCity) {
    const pct = portfolio.byCity[city] / portfolio.totalExposure;
    if (pct > 0.6) {
      warnings.push(
        `High geographic concentration in ${city} (${Math.round(pct * 100)}%)`
      );
    }
  }

  return {
    riskLevel,
    warnings,
    keyNumbers: {
      totalExposure: portfolio.totalExposure,
      totalIncome: portfolio.totalIncome,
      portfolioRisk: Number(portfolio.portfolioRisk.toFixed(2)),
    },
  };
}
