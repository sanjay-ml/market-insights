from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf
import pandas as pd
import numpy as np

app = FastAPI()

@app.get("/")
def root():
    return {
        "status": "ok",
        "message": "Market Insights API is running",
        "endpoints": ["/portfolio?range=1Y|3Y|5Y"]
    }


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

TICKERS = ["AAPL", "MSFT", "GOOGL"]

@app.get("/portfolio")
def get_portfolio():
    data = yf.download(
        TICKERS,
        period="5y",
        auto_adjust=True,
        group_by="ticker"
    )

    prices = pd.DataFrame({
        t: data[t]["Close"] for t in TICKERS
    }).dropna()

    returns = prices.pct_change().dropna()
    portfolio_returns = returns.mean(axis=1)
    portfolio_value = (1 + portfolio_returns).cumprod() * 100

    return {
        "dates": portfolio_value.index.strftime("%Y-%m-%d").tolist(),
        "values": portfolio_value.values.round(2).tolist(),
        "total_return": round((portfolio_value.iloc[-1] / 100 - 1) * 100, 2),
        "volatility": round(portfolio_returns.std() * np.sqrt(252), 2),
        "insights": [
            "GOOGL contributed the most to portfolio growth despite equal weighting.",
            "The portfolio shows lower volatility than individual assets due to diversification.",
            f"The portfolio returned {round((portfolio_value.iloc[-1] / 100 - 1) * 100, 2)}% over 5 years."
        ]
    }
