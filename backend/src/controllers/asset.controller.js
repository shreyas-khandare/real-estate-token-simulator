import { SCENARIOS } from "../services/scenario.service.js";
import { calculateAssetMetrics } from "../services/asset-calc.service.js";
import { getAssetById, getAllAssets, createAsset } from "../models/../models/asset.model.js";

/**
 * POST /assets
 */
export async function createAssetHandler(req, res) {
  try {
    const asset = await createAsset(req.body);
    res.status(201).json(asset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * GET /assets
 */
export async function listAssets(req, res) {
  const assets = await getAllAssets();
  res.json(assets);
}

/**
 * GET /assets/:id?scenario=base
 */
export async function getAssetHandler(req, res) {
  const { id } = req.params;
  const scenarioKey = req.query.scenario || "base";

  const scenario = SCENARIOS[scenarioKey];
  if (!scenario) {
    return res.status(400).json({ error: "Invalid scenario" });
  }

  const asset = await getAssetById(id);
  if (!asset) {
    return res.status(404).json({ error: "Asset not found" });
  }

  const metrics = calculateAssetMetrics(asset, scenario);

  res.json({
    asset,
    scenario: scenarioKey,
    metrics,
  });
}
