import { useEffect, useState } from "react";
import { api } from "../api";

export default function Market() {
  const [assets, setAssets] = useState([]);
  const [qty, setQty] = useState({});

  useEffect(() => {
    api("/market").then(setAssets);
  }, []);

  async function buy(tokenId) {
    const quantity = Number(qty[tokenId]);
    if (!quantity || quantity <= 0) return;

    const yes = confirm(`Buy ${quantity} tokens?`);
    if (!yes) return;

    await api(`/tokens/${tokenId}/buy`, {
      method: "POST",
      body: JSON.stringify({ quantity }),
    });

    alert("Purchase successful");

    
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Market</h2>

      {assets.map((a) => (
        <div key={a.tokenId} className="mb-4 border p-3 rounded">
          <div className="font-medium">
            {a.name} — {a.city}
          </div>
          <div>Price: ₹{a.price.toLocaleString("en-IN")}/token</div>
          <div>Yield: {a.yield}%</div>
          <div>Risk: {a.risk}</div>
          <div>Vacancy: {a.vacancy}%</div>

          <input
            type="number"
            placeholder="Qty"
            className="border p-1 w-24 mr-2"
            onChange={(e) => setQty({ ...qty, [a.tokenId]: e.target.value })}
          />
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded"
            onClick={() => buy(a.tokenId)}
          >
            Buy
          </button>
        </div>
      ))}
    </div>
  );
}
