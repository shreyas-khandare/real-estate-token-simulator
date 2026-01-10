import { useEffect, useState } from "react";
import { api } from "../api";
import Page from "../components/Page";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";

export default function AdminAssets() {
  const [assets, setAssets] = useState([]);
  const [market, setMarket] = useState([]);
  const [form, setForm] = useState({
    name: "",
    city: "",
    asset_type: "",
    total_value: "",
    annual_yield_percent: "",
    base_risk_level: "",
    vacancy_rate_percent: "",
  });

  async function loadData() {
    const a = await api("/assets");
    const m = await api("/market");
    setAssets(a);
    setMarket(m);
  }

  async function createAsset(e) {
    e.preventDefault();

    const payload = {
      name: form.name,
      city: form.city,
      asset_type: form.asset_type.toLowerCase(),
      total_value: Number(form.total_value),
      annual_yield_percent: Number(form.annual_yield_percent),
      base_risk_level: form.base_risk_level.toLowerCase(),
      vacancy_rate_percent: Number(form.vacancy_rate_percent) || 0,
    };

    await api("/assets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    loadData();
  }

  async function tokenize(assetId) {
    const yes = confirm("Tokenize this asset?");
    if (!yes) return;

    await api(`/assets/${assetId}/tokenize`, { method: "POST" });
    loadData();
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Page title="Admin Assets">

      <Card>
        <form className="grid grid-cols-2 gap-3" onSubmit={createAsset}>
          <Input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input placeholder="City" onChange={(e) => setForm({ ...form, city: e.target.value })} />
          <Input placeholder="Asset Type (office, warehouse, land)" onChange={(e) => setForm({ ...form, asset_type: e.target.value })} />
          <Input placeholder="Total Value (₹)" onChange={(e) => setForm({ ...form, total_value: e.target.value })} />
          <Input placeholder="Annual Yield %" onChange={(e) => setForm({ ...form, annual_yield_percent: e.target.value })} />
          <Input placeholder="Risk (low/medium/high)" onChange={(e) => setForm({ ...form, base_risk_level: e.target.value })} />
          <Input placeholder="Vacancy %" onChange={(e) => setForm({ ...form, vacancy_rate_percent: e.target.value })} />

          <div className="col-span-2 flex justify-end">
            <Button type="submit">Create Asset</Button>
          </div>
        </form>
      </Card>

      <div className="space-y-3">
        {assets.map((a) => {
          const isTokenized = market.some((m) => m.assetId === a.id);

          return (
            <Card key={a.id}>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <div className="font-medium">{a.name}</div>
                  <div className="text-sm text-gray-600">{a.city}</div>
                  <div className="text-sm text-gray-700">
                    ₹{Number(a.total_value).toLocaleString("en-IN")} • Yield {a.annual_yield_percent}% • Risk {a.base_risk_level}
                  </div>
                  <div className="text-sm">Tokenized: {isTokenized ? "Yes" : "No"}</div>
                </div>

                {!isTokenized && (
                  <Button onClick={() => tokenize(a.id)}>Tokenize</Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </Page>
  );
}
