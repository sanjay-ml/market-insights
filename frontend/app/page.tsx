"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ApiResponse = {
  dates: string[];
  values: number[];
  total_return: number;
  volatility: number;
  sharpe: number;
};

type ChartPoint = {
  date: string;
  value: number;
};

export default function Page() {
  const [range, setRange] = useState("5Y");
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [metrics, setMetrics] = useState<{
    total_return: number;
    volatility: number;
    sharpe: number;
  } | null>(null);

  useEffect(() => {
    fetch(`https://market-insights-xyq9.onrender.com/portfolio?range=${range}`)
      .then(res => res.json())
      .then((data: ApiResponse) => {
        const points: ChartPoint[] = data.dates.map((d, i) => ({
          date: d,
          value: data.values[i],
        }));

        setChartData(points);
        setMetrics({
          total_return: data.total_return,
          volatility: data.volatility,
          sharpe: data.sharpe,
        });
      });
  }, [range]);

  return (
    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        padding: "40px",
        color: "white",
        fontFamily: "system-ui",
      }}
    >
      <h1>Market Insights Dashboard</h1>
      <p style={{ color: "#aaa" }}>
        Equal-weighted portfolio performance
      </p>

      {metrics && (
        <div style={{ display: "flex", gap: 20, margin: "30px 0" }}>
          <Metric title="Total Return" value={`${metrics.total_return}%`} />
          <Metric title="Volatility" value={`${metrics.volatility}%`} />
          <Metric title="Sharpe Ratio" value={metrics.sharpe.toString()} />
        </div>
      )}

      <div style={{ marginBottom: 16 }}>
        {["1Y", "3Y", "5Y"].map(r => (
          <button
            key={r}
            onClick={() => setRange(r)}
            style={{
              marginRight: 10,
              padding: "6px 14px",
              background: r === range ? "#2563eb" : "#111",
              color: "white",
              border: "1px solid #333",
              cursor: "pointer",
            }}
          >
            {r}
          </button>
        ))}
      </div>

      <div
        style={{
          background: "#0a0a0a",
          borderRadius: 12,
          padding: 20,
          height: 360,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis
              dataKey="date"
              tick={{ fill: "#aaa", fontSize: 12 }}
              tickFormatter={(d) => d.slice(0, 7)}
            />
            <YAxis
              tick={{ fill: "#aaa", fontSize: 12 }}
              domain={["auto", "auto"]}
            />
            <Tooltip
              contentStyle={{
                background: "#111",
                border: "1px solid #333",
                color: "white",
              }}
              labelStyle={{ color: "#aaa" }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#60a5fa"
              strokeWidth={2}
              dot={false}
              isAnimationActive={true}
              animationDuration={600}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Metric({ title, value }: { title: string; value: string }) {
  return (
    <div
      style={{
        background: "#0a0a0a",
        padding: 20,
        borderRadius: 10,
        width: 200,
      }}
    >
      <div style={{ color: "#aaa", fontSize: 14 }}>{title}</div>
      <div style={{ fontSize: 22, marginTop: 8 }}>{value}</div>
    </div>
  );
}
