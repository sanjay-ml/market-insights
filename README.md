## ⚠️ IMPORTANT — READ FIRST

**Before opening the frontend, please open the backend link once and wait for it to load.**

- **Backend (API):** https://market-insights-xyq9.onrender.com  
- **Frontend (Dashboard):** https://market-insights-psi.vercel.app

The backend is deployed on a free-tier service and may go into a sleep state after inactivity.  
Opening the backend URL first wakes up the server. Once it is active, the frontend will load data normally and all interactions will work as expected.

If the frontend is opened before the backend has finished waking up, data may take a few seconds to appear on first load.


Market Insights Dashboard

A full-stack web application that analyzes an equal-weighted stock portfolio using real market data, focusing on risk-adjusted performance and interactive visualization.

This project was built to demonstrate clean full-stack architecture, data-driven reasoning, and production-ready frontend behavior.


Features

- Portfolio performance visualization (1Y / 3Y / 5Y)
- Key financial metrics
  - Total Return
  - Volatility (annualized)
  - Sharpe Ratio
- Interactive Chart
  - Smooth animated transitions on range change
  - Hover tooltips showing exact date & portfolio value


Portfolio Logic

- Assets: AAPL, MSFT, GOOGL
- Portfolio is equal-weighted
- Returns are computed daily
- Portfolio value is normalized to 100 at inception
- Sharpe Ratio uses a fixed 2% annual risk-free rate


Tech Stack

Frontend

- Next.js (React)
- TypeScript
- Recharts (for animated, interactive charts)

Backend

- FastAPI
- pandas, numpy
- yfinance (Yahoo Finance API)


Setup

git clone https://github.com/sanjay-ml/market-insights.git

cd market-insights

cd backend

pip install -r requirements.txt

uvicorn main:app --reload

cd frontend

npm install

npm run dev

open http://localhost:3000 to view the webserver

for api endpoints portfolio open http://localhost:8000/portfolio?range=3Y to view