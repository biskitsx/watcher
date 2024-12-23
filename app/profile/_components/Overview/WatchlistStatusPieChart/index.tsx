"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { palatte } from "@/constant/palatte";
import { WatchlistStatusCountResponse } from "@/app/api/media/chart/actions";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { Empty } from "antd";

const chartConfig = {
  count: {
    label: "count",
  },
  planToWatch: {
    label: "Plan to Watch",
    color: palatte.primary,
  },
  watching: {
    label: "Watching",
    color: palatte.secondary,
  },
  watched: {
    label: "Watched",
    color: palatte.tertiary,
  },
  dropped: {
    label: "Dropped",
    color: palatte.quaternary,
  },
};

export function WatchlistStatusPieChart({
  watchlistStatusCount,
  total,
}: {
  watchlistStatusCount: WatchlistStatusCountResponse;
  total: number;
}) {
  const chartData = [
    {
      status: "Plan to Watch",
      count: watchlistStatusCount.planToWatch,
      fill: palatte.primary,
    },
    {
      status: "Watching",
      count: watchlistStatusCount.watching,
      fill: palatte.secondary,
    },
    {
      status: "Watched",
      count: watchlistStatusCount.watched,
      fill: palatte.tertiary,
    },
    {
      status: "Dropped",
      count: watchlistStatusCount.dropped,
      fill: palatte.quaternary,
    },
  ];

  if (total === 0) {
    return <Empty description="No watchlist yet" className="mt-4" />;
  }

  return (
    <div className="w-full">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="status"
            innerRadius={60}
            strokeWidth={5}
            // activeIndex={1}
            activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
              <Sector {...props} outerRadius={outerRadius + 10} />
            )}
          >
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
                        className="fill-foreground text-3xl font-bold"
                      >
                        {total.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Media
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
          <ChartLegend content={<ChartLegendContent />} />
        </PieChart>
      </ChartContainer>
    </div>
  );
}
