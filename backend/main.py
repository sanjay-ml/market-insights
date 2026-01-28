from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf
import pandas as pd
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

TICKERS = ["AAPL", "MSFT", "GOOGL"]
RISK_FREE_RATE = 0.02  # 2% annual

@app.get("/portfolio")
def portfolio(range: str = "5Y"):
    period_map = {
        "1Y": "1y",
        "3Y": "3y",
        "5Y": "5y",
    }

    period = period_map.get(range.upper(), "5y")

    data = yf.download(
        TICKERS,
        period=period,
        auto_adjust=True,
        group_by="ticker"
    )

    prices = pd.DataFrame({t: data[t]["Close"] for t in TICKERS}).dropna()

    returns = prices.pct_change().dropna()
    portfolio_returns = returns.mean(axis=1)

    portfolio_value = (1 + portfolio_returns).cumprod() * 100

    annual_return = portfolio_returns.mean() * 252
    annual_volatility = portfolio_returns.std() * np.sqrt(252)

    sharpe_ratio = (
        (annual_return - RISK_FREE_RATE) / annual_volatility
        if annual_volatility != 0 else 0
    )

    return {
        "dates": portfolio_value.index.strftime("%Y-%m-%d").tolist(),
        "values": portfolio_value.round(2).tolist(),
        "total_return": round((portfolio_value.iloc[-1] / 100 - 1) * 100, 2),
        "volatility": round(annual_volatility * 100, 2),
        "sharpe": round(sharpe_ratio, 2),
    }
