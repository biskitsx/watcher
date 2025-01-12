"use client";
import { Skeleton } from "antd";

export const MediaCarousel = () => {
  return (
    <div className="w-full">
      <Skeleton.Image className="!w-full !h-[60vh]" active />
    </div>
  );
};
