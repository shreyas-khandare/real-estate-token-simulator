import pool from "../config/db.js";

export async function getHolding(tokenId) {
  const res = await pool.query(
    "SELECT * FROM holdings WHERE token_id = $1",
    [tokenId]
  );
  return res.rows[0];
}

export async function upsertHolding(tokenId, quantity) {
  const existing = await getHolding(tokenId);

  if (!existing) {
    const res = await pool.query(
      "INSERT INTO holdings (token_id, quantity) VALUES ($1, $2) RETURNING *",
      [tokenId, quantity]
    );
    return res.rows[0];
  }

  const res = await pool.query(
    "UPDATE holdings SET quantity = quantity + $2 WHERE token_id = $1 RETURNING *",
    [tokenId, quantity]
  );
  return res.rows[0];
}
