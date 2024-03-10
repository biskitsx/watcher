"use client";
import { Card } from "antd";
import { MediaCard } from "./MediaCard";
import { Container } from "../layout/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons/faCircleChevronRight";
import Link from "next/link";
import { useState } from "react";
import { MediaInfoProps } from "@/wrapper/handled";

interface MediaSliderProps {
  items: MediaInfoProps[];
  name: string;
  type: "movies" | "series" | "anime";
  href: string;
}
export const MediaSlider = ({ items, name, type, href }: MediaSliderProps) => {
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
              return (
                <MediaCard
                  cover={media.poster_path}
                  key={index}
                  title={media.title}
                  release_date={media.release_date}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
