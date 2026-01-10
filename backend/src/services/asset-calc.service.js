export function calculateAssetMetrics(asset, scenario) {
  const baseRiskMap = { low: 1, medium: 2, high: 3 };

  const adjustedYield =
    asset.annual_yield_percent * scenario.yieldMultiplier;

  const adjustedVacancy =
    asset.vacancy_rate_percent + scenario.vacancyDelta;

  const grossIncome =
    asset.total_value * (adjustedYield / 100);

  const effectiveIncome =
    grossIncome * (1 - adjustedVacancy / 100);

  let risk =
    baseRiskMap[asset.base_risk_level] +
    (adjustedVacancy > 15 ? 1 : 0) +
    scenario.riskDelta;

  risk = Math.min(risk, 5);

  return {
    adjustedYield,
    adjustedVacancy,
    annualIncome: Math.max(effectiveIncome, 0),
    riskScore: risk,
  };
}
