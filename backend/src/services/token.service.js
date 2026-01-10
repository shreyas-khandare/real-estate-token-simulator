import { getTokenById } from "../models/token.model.js";
import { getHolding } from "../models/holding.model.js";

export async function getOwnership(tokenId, assetValue) {
  const token = await getTokenById(tokenId);
  const holding = await getHolding(tokenId);

  const owned = holding ? holding.quantity : 0;

  const ownershipPercent = (owned / token.total_supply) * 100;
  const exposureValue = (ownershipPercent / 100) * assetValue;

  return {
    ownedTokens: owned,
    totalSupply: token.total_supply,
    ownershipPercent,
    exposureValue,
  };
}
