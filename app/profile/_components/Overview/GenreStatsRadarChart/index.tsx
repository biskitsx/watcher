"use client";

import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { palatte } from "@/constant/palatte";
import { useState } from "react";
const chartData = [
  { genre: "Action", score: 186 },
  { genre: "Adventure", score: 305 },
  { genre: "Comedy", score: 237 },
  { genre: "Drama", score: 273 },
  { genre: "Fantasy", score: 209 },
  { genre: "Horror", score: 214 },
  { genre: "Mystery", score: 214 },
  { genre: "Romance", score: 214 },
  { genre: "Sci-Fi", score: 214 },
  { genre: "Thriller", score: 214 },
];

export type GenreStats = {
  genre: string;
  score: number;
};

const chartConfig = {
  score: {
    label: "Score",
    color: palatte.secondary,
    // color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface GenreStatsRadarChartProps {
  stats: GenreStats[];
}
export function GenreStatsRadarChart({ stats }: GenreStatsRadarChartProps) {
  return (
    <div className="flex flex-col bg-white gap-4 rounded-md shadow-md border p-4 w-full">
      <h3 className="text-sm font-semibold">Your Favorite Genre</h3>
      <div>
        <ChartContainer config={chartConfig} className="mx-auto  max-h-[250px]">
          <RadarChart data={stats}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="genre" />
            <PolarGrid />
            <Radar
              dataKey="score"
              fill="var(--color-score)"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </div>
    </div>
    // <CardFooter className="flex-col gap-2 text-sm">
    //   <div className="flex items-center gap-2 font-medium leading-none">
    //     Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
    //   </div>
    //   <div className="flex items-center gap-2 leading-none text-muted-foreground">
    //     January - June 2024
    //   </div>
    // </CardFooter>
  );
}
