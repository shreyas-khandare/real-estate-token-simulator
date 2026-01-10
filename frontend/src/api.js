// const BASE = import.meta.env.VITE_API_BASE_URL; // devlopment
const BASE = "https://real-estate-token-simulator.onrender.com"; //production


export async function api(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  return res.json();
}
