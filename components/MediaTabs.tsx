"use client";
import React from "react";
import { ConfigProvider, Tabs } from "antd";
import type { TabsProps } from "antd";
import { Footer } from "./layout/Footer";
import { MediaInfoProps } from "@/wrapper/handled";
import { MediaCard } from "./media/MediaCard";
import Search from "antd/es/input/Search";

const onChange = (key: string) => {
  console.log(key);
};

// interface MediaTapsProps {
//   key: string;
//   label: string;
//   children: React.ReactNode;
// }
interface MediaTapsProps {
  trendingAll: MediaInfoProps[];
}

// TODO - ทำให้ component ใชช้งานได้โดยยส่ง props เข้ามาเป็น TabsProps
export const MediaTaps = ({ trendingAll }: MediaTapsProps) => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Recommend For You",
      children: (
        <div className="flex flex-wrap gap-6 justify-between">
          {trendingAll &&
            trendingAll.map((movie, idx) => (
              <MediaCard
                key={idx}
                cover={movie.poster_path}
                title={movie.title}
                release_date={movie.release_date}
              />
            ))}
        </div>
      ),
    },
    {
      key: "2",
      label: "Search Your Interest",
      children: (
        <div>
          <Search placeholder="Naruto..." enterButton />
        </div>
      ),
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
          },
        },
      }}
    >
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </ConfigProvider>
  );
};
