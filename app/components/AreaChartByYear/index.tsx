"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegendContent,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { palatte } from "@/constant/palatte";
import { MediaByYear } from "@/app/api/media/chart/actions";

const chartConfig = {
  movie: {
    label: "Movie",
    color: palatte.secondary,
  },
  serie: {
    label: "Serie",
    color: palatte.primary,
  },
  anime: {
    label: "Anime",
    color: palatte.tertiary,
  },
} satisfies ChartConfig;

export function AreaChartByYear({
  initialRatingCountByYear,
}: {
  initialRatingCountByYear: MediaByYear[];
}) {
  return (
    <ChartContainer config={chartConfig} className="h-32">
      <AreaChart
        accessibilityLayer
        data={initialRatingCountByYear}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="year"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value, index) => {
            if (index % 3 === 0) return value;
            return "";
          }}
        />
        <ChartLegend content={<ChartLegendContent />} verticalAlign="top" />
        {/* <YAxis /> */}
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Area
          dataKey="serie"
          type="monotone"
          fill="var(--color-serie)"
          fillOpacity={0.4}
          stroke="var(--color-serie)"
          stackId="a"
        />
        <Area
          dataKey="anime"
          type="monotone"
          fill="var(--color-anime)"
          fillOpacity={0.4}
          stroke="var(--color-anime)"
          stackId="a"
        />
        <Area
          dataKey="movie"
          type="monotone"
          fill="var(--color-movie)"
          fillOpacity={0.4}
          stroke="var(--color-movie)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}
