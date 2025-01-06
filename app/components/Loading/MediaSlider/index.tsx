"use client";
import { Skeleton } from "antd";
import { MediaCardLoading } from "../MediaCard";

interface MediaSliderLoadingProps {
  isLong?: boolean;
}
export const MediaSliderLoading = ({ isLong }: MediaSliderLoadingProps) => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
      <div className="flex flex-col gap-2  rounded-md">
        <div>
          <div className="flex gap-2 items-center text-2xl">
            <div className="bg-primary h-6 w-[5px] " />
            <Skeleton.Input active size="large" />
          </div>
        </div>
        <div className="py-2">
          <div className="overflow-x-auto  whitespace-nowrap space-x-5 align-top bg-scroll scrollable-element overflow-y-hidden flex-nowrap flex">
            {items?.map((val, index: number) => {
              return <MediaCardLoading key={index} isLong={isLong} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};
