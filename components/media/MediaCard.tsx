"use client";
import { RadialProgress } from "./RadialProgress";
import { MediaInfoProps } from "@/wrapper/media-info";
import Link from "next/link";
import { formatTheDate } from "@/util/formattedDate";
import { cn } from "@/util/cn";
import { Image } from "antd";

interface MediaCardProps {
  media: MediaInfoProps;
  isLong?: boolean;
  size?: "sm" | "md" | "lg";
}

export const MediaCard = ({ media, isLong, size }: MediaCardProps) => {
  const formattedDate = formatTheDate(media.release_date);
  return (
    <Link href={`/${media.type}/${media.id}`}>
      <div
        className={cn(
          "rounded-md  inline-block cursor-pointer align-top space-y-3",
          {
            "w-[100px] md:w-[140px] ": !isLong,
            "w-[150px] md:w-[210px]": size === "lg" && !isLong,
            "w-[240px]": isLong,
          }
        )}
      >
        <div className="relative">
          <div className="rounded-md shadow-md overflow-hidden relative">
            {/*  eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={isLong ? media.backdrop_path : media.poster_path}
              alt={media.poster_path}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
              }}
              className={cn("hover:scale-105 transition-all object-cover", {
                "w-[240px] h-[135px]": isLong,
                "h-[150px] md:h-[210px]": !isLong,
                "w-[225px] md:w-[315px]": size === "lg" && !isLong,
              })}
            />
          </div>
          <RadialProgress
            value={media.vote_average * 10}
            className="absolute -bottom-4 left-2"
          />
        </div>
        <div className="py-2 px-1">
          <h3 className="truncate font-semibold">{media.title}</h3>
          <p className="truncate text-xs font-medium">{formattedDate}</p>
        </div>
      </div>
    </Link>
  );
};
