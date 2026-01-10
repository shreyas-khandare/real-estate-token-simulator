import { Routes, Route, Link, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminAssets from "./pages/AdminAssets";
import Market from "./pages/Market";
import Portfolio from "./pages/Portfolio";
import Insights from "./pages/Insights";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Navigate to="/admin/assets" />} />
          <Route path="/admin/assets" element={<AdminAssets />} />
          <Route path="/market" element={<Market />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>
      </div>
    </div>
  );
}
