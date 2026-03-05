"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { formatCurrency } from "@/lib/utils/format";

interface Props {
  data: Array<{ date: string; price: number }>;
}

const TIME_RANGES = [
  { label: "1W", days: 7 },
  { label: "1M", days: 30 },
  { label: "3M", days: 90 },
];

export default function PriceChart({ data }: Props) {
  const [range, setRange] = useState(90);

  const filtered = data.slice(-range);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Price Chart</h3>
        <div className="flex gap-1">
          {TIME_RANGES.map((r) => (
            <button
              key={r.label}
              onClick={() => setRange(r.days)}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                range === r.days
                  ? "bg-gold-600 text-white"
                  : "text-dark-400 hover:bg-dark-700"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filtered} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D4A017" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#D4A017" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2D2D2D" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#9E9E9E", fontSize: 11 }}
              tickFormatter={(val) => {
                const d = new Date(val);
                return `${d.getMonth() + 1}/${d.getDate()}`;
              }}
              interval="preserveStartEnd"
              stroke="#2D2D2D"
            />
            <YAxis
              tick={{ fill: "#9E9E9E", fontSize: 11 }}
              tickFormatter={(val) => `$${val.toLocaleString()}`}
              domain={["auto", "auto"]}
              stroke="#2D2D2D"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1E1E1E",
                border: "1px solid #2D2D2D",
                borderRadius: "8px",
                color: "#F5F5F5",
              }}
              formatter={(value) => [formatCurrency(value as number), "Gold Price"]}
              labelFormatter={(label) => new Date(label).toLocaleDateString()}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#D4A017"
              strokeWidth={2}
              fill="url(#goldGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
