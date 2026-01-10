import { createTokenForAsset, getTokenById, getTokenByAssetId } from "../models/token.model.js";
import { upsertHolding } from "../models/holding.model.js";
import { getOwnership } from "../services/token.service.js";
import { getAssetById } from "../models/asset.model.js";
import { getMarketAssets } from "../services/market.service.js";

export async function tokenizeAsset(req, res) {
  const assetId = req.params.id;

  const existing = await getTokenByAssetId(assetId);
  if (existing) {
    return res.status(400).json({ error: "Asset already tokenized" });
  }

  const token = await createTokenForAsset(assetId);
  res.status(201).json(token);
}

export async function buyTokens(req, res) {
  const { tokenId } = req.params;
  const { quantity } = req.body;

  if (!Number.isInteger(quantity) || quantity <= 0) {
    return res.status(400).json({ error: "Invalid quantity" });
  }

  const token = await getTokenById(tokenId);
  if (!token) return res.status(404).json({ error: "Token not found" });

  const holding = await upsertHolding(tokenId, quantity);
  res.json(holding);
}

export async function viewOwnership(req, res) {
  const { tokenId } = req.params;

  const token = await getTokenById(tokenId);
  if (!token) return res.status(404).json({ error: "Token not found" });

  const asset = await getAssetById(token.asset_id);
  const ownership = await getOwnership(tokenId, asset.total_value);

  res.json({
    assetId: asset.id,
    tokenId,
    ...ownership,
  });
}

export async function getMarket(req, res) {
  const data = await getMarketAssets();
  res.json(data);
}