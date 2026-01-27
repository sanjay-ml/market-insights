"use client";

import { useEffect, useState } from "react";

export default function InsightCards() {
  const [insights, setInsights] = useState<string[]>([]);
  const [totalReturn, setTotalReturn] = useState<number>(0);
  const [volatility, setVolatility] = useState<number>(0);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/portfolio")
      .then((res) => res.json())
      .then((json) => {
        setInsights(json.insights);
        setTotalReturn(json.total_return);
        setVolatility(json.volatility);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card title="Total Return" value={`${totalReturn}%`} />
      <Card title="Volatility" value={volatility.toString()} />
      {insights.slice(0, 1).map((i, idx) => (
        <Card key={idx} title="Insight" value={i} />
      ))}
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-4">
      <p className="text-sm text-zinc-400">{title}</p>
      <p className="text-lg mt-1">{value}</p>
    </div>
  );
}
