"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { palatte } from "@/constant/palatte";
import { WatchlistStatusCountResponse } from "@/app/api/media/chart/actions";

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
}: {
  watchlistStatusCount: WatchlistStatusCountResponse;
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
  const totalcount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, []);

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
                        {totalcount.toLocaleString()}
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
        </PieChart>
      </ChartContainer>
    </div>
  );
}
