"use client";
import React from "react";
import { ConfigProvider, Tabs } from "antd";
import type { TabsProps } from "antd";
import { Media } from "@prisma/client";
import { ProfileTable } from "./ProfileTable";
import ProfileCalendar from "./ProfileCalendar";
import { RatingTabs } from "./Ratings";
import { Watchlist } from "./Watchlist";
import { MediaByYear } from "@/app/api/media/chart/actions";
import Overview from "./Overview";

const onChange = (key: string) => {
  console.log(key);
};

interface ProfileTabsProps {
  watchlist: Media[];
  ratings: Media[];
  initialRatingCountByYear: MediaByYear[];
  initialWatchlistCountByYear: MediaByYear[];
}

// TODO - ทำให้ component ใชช้งานได้โดยยส่ง props เข้ามาเป็น TabsProps
export const ProfileTabs = ({
  watchlist,
  ratings,
  initialRatingCountByYear,
  initialWatchlistCountByYear,
}: ProfileTabsProps) => {
  const items: TabsProps["items"] = [
    // {
    //   key: "1",
    //   label: "Overview",
    //   children: <Overview />,
    // },
    {
      key: "1",
      label: "Ratings",
      children: (
        <RatingTabs
          medias={ratings}
          initialRatingCountByYear={initialRatingCountByYear}
        />
      ),
    },
    {
      key: "2",
      label: "Watchlist",
      children: (
        <Watchlist
          medias={watchlist}
          initialWatchlistCountByYear={initialWatchlistCountByYear}
        />
      ),
    },
    {
      key: "3",
      label: "Calendar",
      children: <ProfileCalendar media={watchlist} />,
    },
  ];

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
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} centered />
    </ConfigProvider>
  );
};
