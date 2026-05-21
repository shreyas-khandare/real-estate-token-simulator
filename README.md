# Asset Simulator — Fractional Real Estate Tokenization Platform

A full-stack simulation platform for fractional real-estate tokenization and portfolio analytics.

Users can:
- Authenticate using Google OAuth (Clerk)
- Create and tokenize real-estate assets
- Buy fractional ownership tokens
- Analyze portfolio exposure and diversification
- Generate AI-powered portfolio insights using Gemini AI

This project simulates how tokenized real-estate investment platforms work using modern full-stack architecture.

---

# Features

## Authentication
- Clerk Authentication
- Google OAuth Login
- Protected frontend routes
- Protected backend APIs
- JWT token propagation

## Asset Management
- Create commercial real-estate assets
- Asset metadata management
- Risk-level classification
- Vacancy/yield simulation

## Tokenization Engine
- Fractional ownership simulation
- Asset token supply generation
- Tokenized asset marketplace

## Portfolio Analytics
- Portfolio exposure calculation
- Income/yield estimation
- Risk-weighted portfolio scoring
- Diversification by city and risk category

## AI Insights
- Gemini AI commentary generation
- AI-generated risk analysis
- Portfolio observation summaries

---

# Tech Stack

## Frontend
- React (Vite)
- TailwindCSS
- React Router
- Clerk Authentication

## Backend
- Node.js
- Express.js
- PostgreSQL
- Clerk Express Middleware
- Gemini API

## Database
- PostgreSQL (Neon)

## Deployment
- Vercel (Frontend)
- Render (Backend)

---

# System Architecture

```text
React Frontend
      ↓
Clerk Authentication
      ↓
JWT Bearer Token
      ↓
Express Backend API
      ↓
PostgreSQL Database
      ↓
Gemini AI Insights
```

---

# Authentication Flow

```text
User Login (Google OAuth)
        ↓
Clerk Session Created
        ↓
Frontend Retrieves JWT Token
        ↓
Bearer Token Sent to Backend
        ↓
Express Middleware Verifies User
        ↓
Protected Route Access Granted
```

---

# Database Schema

```sql
CREATE TABLE assets (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  asset_type TEXT CHECK (
    asset_type IN ('office','warehouse','retail')
  ),
  total_value NUMERIC NOT NULL,
  annual_yield_percent NUMERIC NOT NULL,
  base_risk_level TEXT CHECK (
    base_risk_level IN ('low','medium','high')
  ),
  vacancy_rate_percent NUMERIC NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tokens (
  id SERIAL PRIMARY KEY,
  asset_id INTEGER UNIQUE
    REFERENCES assets(id)
    ON DELETE CASCADE,
  total_supply INTEGER NOT NULL
    CHECK (total_supply > 0)
);

CREATE TABLE holdings (
  id SERIAL PRIMARY KEY,
  token_id INTEGER
    REFERENCES tokens(id)
    ON DELETE CASCADE,
  quantity INTEGER NOT NULL
    CHECK (quantity >= 0)
);
```

---

# API Routes

## Assets
```http
GET    /assets
POST   /assets
GET    /assets/:id
POST   /assets/:id/tokenize
```

## Portfolio
```http
GET    /portfolio
```

## Market
```http
GET    /market
POST   /buy
```

## Insights
```http
GET    /insights
```

---

# Local Setup

## Clone Repository

```bash
git clone https://github.com/shreyas-khandare/real-estate-token-simulator.git
cd real-estate-token-simulator
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

# Environment Variables

## Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
```

---

## Backend (.env)

```env
DATABASE_URL=your_neon_database_url

GEMINI_API_KEY=your_gemini_api_key

CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

---

# Key Engineering Concepts Demonstrated

- Full-stack authentication architecture
- JWT token propagation
- OAuth integration
- Protected backend APIs
- REST API architecture
- PostgreSQL relational schema design
- Portfolio risk calculations
- AI integration into business workflows
- Cloud deployment architecture
- Cross-origin API communication (CORS)

---

# Future Improvements

- Role-Based Access Control (RBAC)
- Transaction history
- Portfolio charts and analytics
- Multi-user support
- Real-time market simulation
- Asset image uploads
- Admin dashboard analytics
- PDF portfolio exports

---

# Disclaimer

This is an educational simulation project and does not provide financial advice or real investment functionality.