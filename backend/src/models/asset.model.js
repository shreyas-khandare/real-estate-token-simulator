import pool from "../config/db.js";

/**
 * Create a new asset
 */
export async function createAsset(asset) {
  const {
    name,
    city,
    asset_type,
    total_value,
    annual_yield_percent,
    base_risk_level,
    vacancy_rate_percent,
  } = asset;

  const result = await pool.query(
    `
    INSERT INTO assets
    (name, city, asset_type, total_value, annual_yield_percent, base_risk_level, vacancy_rate_percent)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `,
    [
      name,
      city,
      asset_type,
      total_value,
      annual_yield_percent,
      base_risk_level,
      vacancy_rate_percent,
    ]
  );

  return result.rows[0];
}

/**
 * Get asset by ID
 */
export async function getAssetById(id) {
  const result = await pool.query(
    "SELECT * FROM assets WHERE id = $1",
    [id]
  );

  return result.rows[0];
}

/**
 * Get all assets
 */
export async function getAllAssets() {
  const result = await pool.query("SELECT * FROM assets");
  return result.rows;
}
