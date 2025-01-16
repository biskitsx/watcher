import React from "react";
import type { CalendarProps } from "antd";
import { Calendar, Tag } from "antd";
import type { Dayjs } from "dayjs";
import { Container } from "@/components/layout/Container";
import { Media } from "@prisma/client";
import dayjs from "dayjs"; // Import dayjs for date manipulation
import { SeriesEpisode } from "@/app/api/media/types";

interface ProfileCalendarProps {
  media?: Media[];
  episodes?: SeriesEpisode[];
}

const ProfileCalendar = ({ media, episodes }: ProfileCalendarProps) => {
  const getDateData = (value: Dayjs, type: "day" | "month") => {
    let listData: {
      type: "success" | "error" | "warning" | "default" | "processing";
      episode: SeriesEpisode;
    }[] = [];
    // Check if media array is provided and filter events for the current date
    if (episodes) {
      episodes.forEach((item) => {
        const releaseDate = dayjs(item.air_date);
        if (value.isSame(releaseDate, type)) {
          listData.push({
            type: "processing",
            episode: item,
          });
        }
      });
    }

    return listData;
  };

  const monthCellRender = (value: Dayjs) => {
    const listData = getDateData(value, "month");
    return listData.length != 0 ? (
      <div className="notes-month">
        {listData.map((item, index) => {
          let text = item.episode.title;
          if (item.episode.media_type === "serie") {
            text = `${item.episode.title} (#${item.episode.episode_number})`;
          }

          const color = getTagColorByType(item.episode.media_type);
          return (
            <li key={index}>
              <Tag color={color} className="!w-full">
                {text}
              </Tag>
            </li>
          );
        })}
      </div>
    ) : null;
  };

  const getTagColorByType = (type: string) => {
    if (type === "serie") return "orange";
    if (type === "anime") return "purple";
    return "green";
  };
  const dateCellRender = (value: Dayjs) => {
    const listData = getDateData(value, "day");
    return (
      <ul className="events">
        {listData.map((item, index) => {
          let text = item.episode.title;
          if (item.episode.media_type === "serie") {
            text = `${item?.episode?.title} (#${item?.episode?.episode_number})`;
          }
          const color = getTagColorByType(item.episode.media_type);
          return (
            <li key={index}>
              <Tag color={color} className="!w-full">
                {text}
              </Tag>
            </li>
          );
        })}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <Container>
      <h1 className="text-xl font-bold pt-6">Watchlist Calendar</h1>
      <Calendar cellRender={cellRender} />
    </Container>
  );
};

export default ProfileCalendar;
