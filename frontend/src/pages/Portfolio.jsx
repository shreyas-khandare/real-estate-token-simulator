import { useEffect, useState } from "react";
import { api } from "../api";

export default function Portfolio() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api("/portfolio").then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;

  // Risk -> Label
  function riskLabel(score) {
    if (score <= 1.5) return "Low";
    if (score <= 2.2) return "Medium";
    return "High";
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-3">Portfolio Summary</h2>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="border rounded p-3">
          <div className="text-sm text-gray-600">Total Exposure</div>
          <div className="text-lg font-semibold">
            ₹{data.totalExposure.toLocaleString("en-IN")}
          </div>
        </div>

        <div className="border rounded p-3">
          <div className="text-sm text-gray-600">Total Income (annual)</div>
          <div className="text-lg font-semibold">
            ₹{data.totalIncome.toLocaleString("en-IN")}
          </div>
        </div>

        <div className="border rounded p-3">
          <div className="text-sm text-gray-600">Portfolio Risk</div>
          <div className="text-lg font-semibold">
            {riskLabel(data.portfolioRisk)} ({data.portfolioRisk.toFixed(2)})
          </div>
        </div>
      </div>

      {/* Breakdown - By Asset */}
      <h3 className="font-semibold mt-3 mb-1">By Asset</h3>
      <div className="space-y-2 mb-4">
        {data.byAsset.map((a) => (
          <div key={a.assetId} className="border rounded p-3">
            <div className="font-medium">{a.name}</div>
            <div>Exposure: ₹{a.exposure.toLocaleString("en-IN")}</div>
            <div>Income: ₹{a.income.toLocaleString("en-IN")}/yr</div>
            <div>Risk: {a.risk}</div>
          </div>
        ))}
      </div>

      {/* Breakdown - By City */}
      <h3 className="font-semibold mt-3 mb-1">By City</h3>
      <div className="space-y-1">
        {Object.entries(data.byCity).map(([city, exp]) => (
          <div key={city}>
            {city}: ₹{exp.toLocaleString("en-IN")}
          </div>
        ))}
      </div>
    </div>
  );
}
