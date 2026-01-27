"use client";

import { useEffect, useMemo, useState } from "react";
import PortfolioChart from "./PortfolioChart";
import RangeSelector from "./RangeSelector";

type Point = {
  date: string;
  value: number;
};

export default function PortfolioSection() {
  const [range, setRange] = useState<"1Y" | "3Y" | "5Y">("5Y");
  const [allData, setAllData] = useState<Point[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/portfolio")
      .then((res) => res.json())
      .then((json) => {
        const zipped: Point[] = json.dates.map(
          (date: string, i: number) => ({
            date,
            value: Number(json.values[i]),
          })
        );
        setAllData(zipped);
      })
      .catch(console.error);
  }, []);

  const data = useMemo(() => {
    const points =
      range === "1Y" ? 252 :
      range === "3Y" ? 252 * 3 :
      allData.length;

    return allData.slice(-points);
  }, [range, allData]);

  return (
    <section className="rounded-xl border border-white/10 bg-black/40 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium">Portfolio Value</h2>
        <RangeSelector value={range} onChange={setRange} />
      </div>

      {data.length === 0 ? (
        <div className="h-96 w-full rounded-lg bg-white/5 animate-pulse" />
      ) : (
        <PortfolioChart data={data} />
      )}
    </section>
  );
}
