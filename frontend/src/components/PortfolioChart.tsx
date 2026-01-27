"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Point = {
  date: string;
  value: number;
};

export default function PortfolioChart({ data }: { data: Point[] }) {
  return (
    <div className="h-96 w-full">
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="date" hide />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false} // ⚡ no lag
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
