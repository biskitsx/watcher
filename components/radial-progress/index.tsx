"use client";

import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartConfig = {
  score: {
    label: "score",
  },
} satisfies ChartConfig;

export function RadialProgressShadCN() {
  const value = 80;
  const chartData = [{ score: value, fill: "green" }];
  const startAngle = 90;
  const endAngle = startAngle - (value / 100) * 360;
  return (
    <div>
      <ChartContainer config={chartConfig} className="bg-red-500">
        <RadialBarChart
          data={chartData}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={20}
          // innerRadius={80}
          // outerRadius={110}
          // outerRadius={110}
          barSize={3}
          className="bg-blue-300 aspect-square"
        >
          <PolarGrid
            gridType="circle"
            radialLines={false}
            style={{ fill: "black" }}
            stroke="none"
            polarRadius={[0, 25]}
          />
          <RadialBar dataKey="score" cornerRadius={10} />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="text-xs font-bold "
                        style={{ fill: "white" }}
                      >
                        {chartData[0].score.toLocaleString()}%
                      </tspan>
                      {/* <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                          >
                          score
                        </tspan> */}
                    </text>
                  );
                }
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </ChartContainer>
    </div>
  );
}
