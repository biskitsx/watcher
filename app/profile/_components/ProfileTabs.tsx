"use client";
import React from "react";
import { ConfigProvider, Tabs } from "antd";
import type { TabsProps } from "antd";
import { MediaInfoProps } from "@/wrapper/media-info";
import Search from "antd/es/input/Search";
import { Media } from "@prisma/client";
import { ProfileTable } from "./ProfileTable";
import ProfileCalendar from "./ProfileCalendar";

const onChange = (key: string) => {
  console.log(key);
};

interface ProfileTabsProps {
  watchlist: Media[];
  ratings: Media[];
}

// TODO - ทำให้ component ใชช้งานได้โดยยส่ง props เข้ามาเป็น TabsProps
export const ProfileTabs = ({ watchlist, ratings }: ProfileTabsProps) => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Watchlist",
      children: <ProfileTable media={watchlist} title="Watchlist" />,
    },
    {
      key: "2",
      label: "Ratings",
      children: <ProfileTable media={ratings} title="Ratings" />,
    },
    {
      key: "3",
      label: "Calendar",
      children: <ProfileCalendar />,
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
