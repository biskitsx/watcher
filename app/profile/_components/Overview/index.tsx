"use client";

import { Container } from "@/components/layout/Container";
import { GenreStats, GenreStatsRadarChart } from "./GenreStatsRadarChart";
import { FaBookmark, FaHeart, FaStar } from "react-icons/fa";
import {
  MediaTotal,
  WatchlistStatusCountResponse,
  getGenreStats,
  getMediaTotal,
  getWatchlistStatusCount,
} from "@/app/api/media/chart/actions";
import { WatchlistStatusPieChart } from "./WatchlistStatusPieChart";
import { SelectMediaType } from "../SelectMediaType";
import { useMemo, useState } from "react";
import { Empty, Skeleton } from "antd";

interface OverviewProps {
  stats: GenreStats[];
  mediaTotal: MediaTotal;
  watchlistStatusCount: WatchlistStatusCountResponse;
  isTabsLoading?: boolean;
}
export default function Overview({
  stats,
  mediaTotal,
  watchlistStatusCount,
  isTabsLoading,
}: OverviewProps) {
  const [statsState, setStatsState] = useState<GenreStats[]>(stats);
  const [mediaTotalState, setMediaTotalState] =
    useState<MediaTotal>(mediaTotal);
  const [watchlistStatusCountState, setWatchlistStatusCountState] =
    useState<WatchlistStatusCountResponse>(watchlistStatusCount);
  const [isLoading, setIsLoading] = useState(false);
  const onSelectMediaTypeChange = async (mediaType: string) => {
    try {
      setIsLoading(true);
      const newStats = await getGenreStats(mediaType);
      const newMediaTotal = await getMediaTotal(mediaType);
      const newWatchlistStatusCount = await getWatchlistStatusCount(mediaType);

      setStatsState(newStats);
      setMediaTotalState(newMediaTotal);
      setWatchlistStatusCountState(newWatchlistStatusCount);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const total = useMemo(
    () => [
      {
        title: "Total Watchlist",
        value: mediaTotalState.watchlistTotal,
        icon: <FaBookmark />,
      },
      {
        title: "Total Ratings",
        value: mediaTotalState.ratingTotal,
        icon: <FaStar />,
      },
      {
        title: "Total Favorite",
        value: mediaTotalState.favoriteTotal,
        icon: <FaHeart />,
      },
    ],
    [statsState, mediaTotalState, watchlistStatusCountState]
  );

  return (
    <Container className="py-6 relative">
      <div className="flex justify-between z-20">
        <h1 className="text-xl font-bold">Overview</h1>
        <SelectMediaType onChange={onSelectMediaTypeChange} />
      </div>
      <div className="flex gap-4 justify-between z-20">
        {total.map((item, idx) => (
          <div
            className="flex rounded-md shadow-md border p-4 flex-col w-full gap-4"
            key={idx}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">{item.title}</h3>
              <span className="text-gray-400">{item.icon}</span>
            </div>
            {isTabsLoading || isLoading ? (
              <Skeleton.Button active className="!w-1" style={{ width: 10 }} />
            ) : (
              <p className="text-2xl font-bold text-primary">{item.value}</p>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-4 w-full flex-col sm:flex-row z-20">
        <GenreStatsRadarChart stats={statsState} />
        <div className="flex rounded-md shadow-md border p-4 flex-col w-full gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Your Watchlist</h3>
            <span className="text-gray-400">
              <FaStar />
            </span>
          </div>
          {mediaTotalState.watchlistTotal !== 0 ? (
            <WatchlistStatusPieChart
              watchlistStatusCount={watchlistStatusCountState}
              total={mediaTotalState.watchlistTotal}
            />
          ) : (
            <Empty description="No watchlist yet" className="mt-4" />
          )}
        </div>
      </div>
    </Container>
  );
}
