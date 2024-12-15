"use client";
import React, { useMemo, useState } from "react";
import { ConfigProvider, Tabs, Spin } from "antd";
import type { TabsProps } from "antd";
import { Media } from "@prisma/client";
import { RatingTabs } from "./Ratings";
import { Watchlist } from "./Watchlist";
import ProfileCalendar from "./ProfileCalendar";
import {
  MediaByYear,
  MediaTotal,
  WatchlistStatusCountResponse,
} from "@/app/api/media/chart/actions";
import { getUserRatings, getUserWatchList } from "@/app/api/media/actions";
import Overview from "./Overview";
import { GenreStats } from "./Overview/GenreStatsRadarChart";

interface ProfileTabsProps {
  watchlist: Media[];
  ratings: Media[];
  initialRatingCountByYear: MediaByYear[];
  initialWatchlistCountByYear: MediaByYear[];
  initialGenreStats: GenreStats[];
  initialMediaTotal: MediaTotal;
  watchlistStatusCount: WatchlistStatusCountResponse;
}

export const ProfileTabs = ({
  watchlist,
  ratings,
  initialRatingCountByYear,
  initialWatchlistCountByYear,
  initialGenreStats,
  initialMediaTotal,
  watchlistStatusCount,
}: ProfileTabsProps) => {
  const [ratingsItems, setRatingsItems] = useState<Media[]>(ratings);
  const [watchlistItems, setWatchlistItems] = useState<Media[]>(watchlist);
  const [loading, setLoading] = useState(false);
  const [genreStats, setGenreStats] = useState<GenreStats[]>(initialGenreStats);
  const [mediaTotal, setMediaTotal] = useState<MediaTotal>(initialMediaTotal);
  const onChange = async (key: string) => {
    setLoading(true); // Show loading spinner during the data fetch
    if (key === "ratings") {
      const newRatings = await getUserRatings();
      setRatingsItems(newRatings || []); // Update ratings or clear if empty
    } else {
      const newWatchlist = await getUserWatchList();
      setWatchlistItems(newWatchlist || []); // Update watchlist or clear if empty
    }
    setLoading(false); // Hide loading spinner after update
  };

  const items: TabsProps["items"] = useMemo(
    () => [
      {
        key: "overview",
        label: "Overview",
        children: (
          <Overview
            stats={genreStats}
            mediaTotal={mediaTotal}
            watchlistStatusCount={watchlistStatusCount}
            isTabsLoading={loading}
          />
        ),
      },
      {
        key: "ratings",
        label: "Ratings",
        children: (
          <RatingTabs
            medias={ratingsItems}
            initialRatingCountByYear={initialRatingCountByYear}
            isTabsLoading={loading}
          />
        ),
      },
      {
        key: "watchlist",
        label: "Watchlist",
        children: (
          <Watchlist
            medias={watchlistItems}
            initialWatchlistCountByYear={initialWatchlistCountByYear}
            isTabsLoading={loading}
          />
        ),
      },
      {
        key: "calendar",
        label: "Calendar",
        children: loading ? (
          <div className="flex justify-center items-center h-full pt-10">
            <Spin size="large" />
          </div>
        ) : (
          <ProfileCalendar media={watchlistItems} />
        ),
      },
    ],
    [
      ratingsItems,
      watchlistItems,
      loading,
      initialRatingCountByYear,
      initialWatchlistCountByYear,
      initialMediaTotal,
    ]
  );

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            itemHoverColor: "#F79552",
            itemSelectedColor: "#F79552",
            inkBarColor:
              "linear-gradient(90deg, rgba(2,0,36,1) 0%, #F79552 0%, #1CBEC8 100%)",
            margin: 0,
          },
        },
      }}
    >
      <Tabs
        defaultActiveKey="overview"
        items={items}
        onChange={onChange}
        centered
      />
    </ConfigProvider>
  );
};
