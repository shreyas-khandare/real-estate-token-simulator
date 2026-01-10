import pool from "../config/db.js";

export async function getMarketAssets() {
  const result = await pool.query(`
    SELECT
      a.id AS asset_id,
      a.name,
      a.city,
      a.asset_type,
      a.annual_yield_percent,
      a.base_risk_level,
      a.vacancy_rate_percent,
      a.total_value,
      t.id AS token_id,
      t.total_supply
    FROM assets a
    JOIN tokens t ON t.asset_id = a.id
  `);

  return result.rows.map(r => ({
    assetId: r.asset_id,
    tokenId: r.token_id,
    name: r.name,
    city: r.city,
    type: r.asset_type,
    price: Number(r.total_value) / Number(r.total_supply),
    yield: r.annual_yield_percent,
    risk: r.base_risk_level,
    vacancy: r.vacancy_rate_percent,
    supply: r.total_supply,
  }));
}

