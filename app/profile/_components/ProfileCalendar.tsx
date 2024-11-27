import React from "react";
import type { BadgeProps, CalendarProps } from "antd";
import { Badge, Calendar, Tag } from "antd";
import type { Dayjs } from "dayjs";
import { Container } from "@/components/layout/Container";
import { Media } from "@prisma/client";
import dayjs from "dayjs"; // Import dayjs for date manipulation
import Link from "next/link";

interface ProfileCalendarProps {
  media?: Media[];
}

const ProfileCalendar = ({ media }: ProfileCalendarProps) => {
  const getDateData = (value: Dayjs, type: "day" | "month") => {
    let listData: { type: "success" | "error" | "warning"; media: Media }[] =
      [];

    // Check if media array is provided and filter events for the current date
    if (media) {
      media.forEach((item) => {
        const releaseDate = dayjs(item.mediaReleaseDate);
        if (value.isSame(releaseDate, type)) {
          listData.push({
            type: "success",
            media: item,
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
        {listData.map((item, index) => (
          <li key={index}>
            <Badge
              status={item.type as BadgeProps["status"]}
              text={item.media.mediaTitle}
            />
          </li>
        ))}
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getDateData(value, "day");
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Link href={`/${item.media.mediaType}/${item.media.mediaId}`}>
              <Badge
                status={item.type as BadgeProps["status"]}
                text={item.media.mediaTitle}
                size="small"
              />
            </Link>
          </li>
        ))}
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
