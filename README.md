# Asset Simulator — Fractional Real Estate Tokenization (Demo)

A simulation platform for fractional real-estate tokenization.  
Users can:
- Create assets (Admin)
- Tokenize assets
- Buy fractional tokens (single-user simulation)
- View portfolio exposure + income
- Generate AI portfolio insights using Gemini

---

## Tech Stack

### Frontend
- React (Vite)
- TailwindCSS
- React Router

### Backend
- Node.js + Express
- PostgreSQL (Neon)
- Gemini API (Google)

### Database
PostgreSQL schema:

```sql
CREATE TABLE assets (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  asset_type TEXT CHECK (asset_type IN ('office','warehouse','retail')),
  total_value NUMERIC NOT NULL,
  annual_yield_percent NUMERIC NOT NULL,
  base_risk_level TEXT CHECK (base_risk_level IN ('low','medium','high')),
  vacancy_rate_percent NUMERIC NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tokens (
  id SERIAL PRIMARY KEY,
  asset_id INTEGER UNIQUE REFERENCES assets(id) ON DELETE CASCADE,
  total_supply INTEGER NOT NULL CHECK (total_supply > 0)
);

CREATE TABLE holdings (
  id SERIAL PRIMARY KEY,
  token_id INTEGER REFERENCES tokens(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL CHECK (quantity >= 0)
);
