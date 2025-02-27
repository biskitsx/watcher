"use client";
import { MediaCard } from "./MediaCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons/faCircleChevronRight";
import Link from "next/link";
import { useMemo, useState } from "react";
import { MediaInfoProps } from "@/wrapper/media-info";
import { cn } from "@/util/cn";
import { Box } from "@chakra-ui/react";

export interface MediaSliderProps {
  items: MediaInfoProps[];
  name: string;
  type: "movie" | "serie" | "anime";
  href: string;
  isLong?: boolean;
  bgColor?: string;
  shouldRender?: boolean;
}
export const MediaSlider = ({
  items,
  name,
  type,
  href,
  isLong,
  shouldRender = true,
}: MediaSliderProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isLink = href !== "#";
  return (
    <>
      <Box
        className={cn("flex flex-col gap-2 z-20  rounded-md bg-transparent", {
          hidden: !shouldRender,
        })}
      >
        <div>
          {isLink ? (
            <Link
              href={href}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="flex gap-2 items-center text-2xl">
                <div className="bg-primary h-6 w-[5px] " />
                <h1 className="font-bold">{name}</h1>
                {isHovered ? (
                  <FontAwesomeIcon
                    icon={faCircleChevronRight}
                    width={20}
                    beat
                  />
                ) : (
                  <FontAwesomeIcon icon={faCircleChevronRight} width={20} />
                )}
              </div>
            </Link>
          ) : (
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="flex gap-2 items-center text-2xl">
                <div className="bg-primary h-6 w-[5px] " />
                <h1 className="font-bold">{name}</h1>
                {isHovered ? (
                  <FontAwesomeIcon
                    icon={faCircleChevronRight}
                    width={20}
                    beat
                  />
                ) : (
                  <FontAwesomeIcon icon={faCircleChevronRight} width={20} />
                )}
              </div>
            </div>
          )}
        </div>
        <div className="py-2">
          <div className="overflow-x-auto  whitespace-nowrap space-x-5 align-top bg-scroll scrollable-element overflow-y-hidden flex-nowrap flex">
            {items?.map((media, index: number) => {
              return <MediaCard media={media} key={index} isLong={isLong} />;
            })}
          </div>
        </div>
      </Box>
    </>
  );
};
