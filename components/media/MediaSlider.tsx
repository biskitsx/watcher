"use client";
import { Card } from "antd";
import { MediaCard } from "./MediaCard";
import { Container } from "../layout/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons/faCircleChevronRight";
import Link from "next/link";
import { useState } from "react";
import { MediaInfoProps } from "@/wrapper/media-info";

interface MediaSliderProps {
  items: MediaInfoProps[];
  name: string;
  type: "movie" | "serie" | "anime";
  href: string;
  isLong?: boolean;
}
export const MediaSlider = ({
  items,
  name,
  type,
  href,
  isLong,
}: MediaSliderProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <div className="flex flex-col gap-2">
        <Link
          href={href}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex gap-2 items-center text-2xl">
            <div className="bg-primary h-6 w-[5px] " />
            <h1 className="font-bold">{name}</h1>
            {isHovered ? (
              <FontAwesomeIcon icon={faCircleChevronRight} width={20} beat />
            ) : (
              <FontAwesomeIcon icon={faCircleChevronRight} width={20} />
            )}
          </div>
        </Link>
        <div className="py-2">
          <div className="overflow-x-auto  whitespace-nowrap space-x-5 align-top bg-scroll scrollable-element overflow-y-hidden">
            {items?.map((media, index: number) => {
              return <MediaCard media={media} key={index} isLong={isLong} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};
