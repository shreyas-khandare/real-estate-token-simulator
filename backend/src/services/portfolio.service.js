import pool from "../config/db.js";

export async function computePortfolio() {
  const result = await pool.query(`
    SELECT
      a.id AS asset_id,
      a.name,
      a.city,
      a.base_risk_level,
      a.annual_yield_percent,
      a.vacancy_rate_percent,
      a.total_value,
      t.total_supply,
      COALESCE(h.quantity, 0) AS owned_tokens
    FROM assets a
    JOIN tokens t ON t.asset_id = a.id
    LEFT JOIN holdings h ON h.token_id = t.id
  `);

  let totalExposure = 0;
  let totalIncome = 0;
  let riskNumerator = 0;

  const byAsset = [];
  const byCity = {};
  const byRisk = {};

  const riskMap = { low: 1, medium: 2, high: 3 };

  for (const row of result.rows) {
    if (row.owned_tokens === 0) continue;

    const ownership = row.owned_tokens / row.total_supply;
    const exposure = ownership * row.total_value;

    const income =
      exposure *
      (row.annual_yield_percent / 100) *
      (1 - row.vacancy_rate_percent / 100);

    const riskValue = riskMap[row.base_risk_level];

    totalExposure += exposure;
    totalIncome += income;
    riskNumerator += exposure * riskValue;

    byAsset.push({
      assetId: row.asset_id,
      name: row.name,
      exposure,
      income,
      risk: row.base_risk_level,
    });

    byCity[row.city] = (byCity[row.city] || 0) + exposure;
    byRisk[row.base_risk_level] =
      (byRisk[row.base_risk_level] || 0) + exposure;
  }

  const portfolioRisk =
    totalExposure > 0 ? riskNumerator / totalExposure : 0;

  return {
    totalExposure,
    totalIncome,
    portfolioRisk,
    byAsset,
    byCity,
    byRisk,
  };
}
