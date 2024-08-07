"use client"
import { RadialProgress } from "./RadialProgress";
import { MediaInfoProps } from "@/wrapper/media-info";
import Link from "next/link";
import { formatTheDate } from "@/util/formattedDate";
import { cn } from "@/util/cn";
import { Image } from "antd";

interface MediaCardProps {
  media: MediaInfoProps;
  isLong?: boolean;
}

export const MediaCard = ({ media, isLong }: MediaCardProps) => {
  const formattedDate = formatTheDate(media.release_date);
  return (
    <Link href={`/${media.type}/${media.id}`}>
      <div
        className={cn(
          "w-[100px] md:w-[140px] rounded-md  inline-block cursor-pointer align-top space-y-3",
          {
            "w-[220px] md:w-[300px]": isLong,
          }
        )}
      >
        <div className="relative">
          <div className="rounded-md shadow-md overflow-hidden relative">
            <img
              src={media.poster_path}
              alt={media.poster_path}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
              }}
              className={cn(
                "hover:scale-105 transition-all object-cover h-[150px] md:h-[210px]"
              )}
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
