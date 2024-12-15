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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  // const totalcount = React.useMemo(() => {
  //   return chartData.reduce((acc, curr) => acc + curr.count, 0);
  // }, []);

  // const id = "pie-interactive"
  // const [activeStatus, setActiveStatus] = React.useState(chartData[0].status)
  // const activeIndex = React.useMemo(
  //   () => chartData.findIndex((item) => item.status === activeStatus),
  //   [activeStatus]
  // )
  // const status = React.useMemo(() => chartData.map((item) => item.status), [])

  return (
    <div className="w-full">
      {/* <Select value={activeStatus} onValueChange={setActiveStatus}>
        <SelectTrigger
          className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
          aria-label="Select a value"
        >
          <SelectValue placeholder="Select month" />
        </SelectTrigger>
        <SelectContent align="end" className="rounded-xl">
          {months.map((key) => {
            const config = chartConfig[key as keyof typeof chartConfig];
            if (!config) {
              return null;
            }
            return (
              <SelectItem
                key={key}
                value={key}
                className="rounded-lg [&_span]:flex"
              >
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className="flex h-3 w-3 shrink-0 rounded-sm"
                    style={{
                      backgroundColor: `var(--color-${key})`,
                    }}
                  />
                  {config?.label}
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select> */}
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
