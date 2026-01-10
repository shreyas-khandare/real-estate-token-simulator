import { useEffect, useState } from "react";
import { api } from "../api";

export default function Insights() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const res = await api("/insights");
      setData(res);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) return <div className="p-4">Loading insights...</div>;
  if (!data) return <div className="p-4 text-red-600">Failed to load insights</div>;

  const { rules, ai } = data;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold">AI Portfolio Insights</h2>

      {/* ==== KEY METRICS ==== */}
      <div className="p-4 border rounded bg-gray-50">
        <h3 className="font-semibold mb-2">Portfolio Metrics</h3>

        <div>Total Exposure: ₹{rules.keyNumbers.totalExposure.toLocaleString("en-IN")}</div>
        <div>Total Income: ₹{rules.keyNumbers.totalIncome.toLocaleString("en-IN")}/yr</div>
        <div>Portfolio Risk Score: {rules.keyNumbers.portfolioRisk}</div>
        <div>Risk Level: <span className="font-medium">{rules.riskLevel}</span></div>
      </div>

      {/* ==== WARNINGS ==== */}
      {rules.warnings.length > 0 && (
        <div className="p-4 border rounded bg-yellow-50">
          <h3 className="font-semibold mb-2 text-yellow-800">Concentration Warnings</h3>
          <ul className="list-disc ml-6 space-y-1">
            {rules.warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ==== AI SUMMARY ==== */}
      <div className="p-4 border rounded bg-blue-50">
        <h3 className="font-semibold mb-2 text-blue-800">AI Commentary</h3>
        {ai.summary ? (
          <pre className="whitespace-pre-wrap text-sm leading-relaxed">
            {ai.summary}
          </pre>
        ) : (
          <div className="text-gray-600 italic">
            AI unavailable — fallback to rules only.
          </div>
        )}
      </div>
    </div>
  );
}
