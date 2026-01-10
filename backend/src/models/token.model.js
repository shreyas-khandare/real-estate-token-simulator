import pool from "../config/db.js";

export async function createTokenForAsset(assetId) {
  const result = await pool.query(
    `
    INSERT INTO tokens (asset_id, total_supply)
    VALUES ($1, 10000)
    RETURNING *
    `,
    [assetId]
  );
  return result.rows[0];
}

export async function getTokenByAssetId(assetId) {
  const res = await pool.query(
    "SELECT * FROM tokens WHERE asset_id = $1",
    [assetId]
  );
  return res.rows[0];
}

export async function getTokenById(tokenId) {
  const res = await pool.query(
    "SELECT * FROM tokens WHERE id = $1",
    [tokenId]
  );
  return res.rows[0];
}
