"use client";

import dynamic from "next/dynamic";

const PriceChart = dynamic(() => import("./PriceChart"), { ssr: false });

interface Props {
  data: Array<{ date: string; price: number }>;
}

export default function PriceChartWrapper({ data }: Props) {
  return <PriceChart data={data} />;
}
