import { RadialProgress } from "@/components/media/RadialProgress";
import { cn } from "@/util/cn";
import { Skeleton } from "antd";
import { FaEllipsisV } from "react-icons/fa";

interface MediaCardLoadingProps {
  isLong?: boolean;
  size?: "sm" | "md" | "lg";
}
export const MediaCardLoading = ({
  isLong = false,
  size,
}: MediaCardLoadingProps) => {
  return (
    <div className="">
      <div
        className={cn("rounded-md  inline-block align-top space-y-3", {
          "w-[100px] md:w-[140px] ": !isLong,
          "w-[150px] md:w-[210px]": size === "lg" && !isLong,
          "w-[240px]": isLong,
        })}
      >
        <div className="relative">
          <div className="rounded-md shadow-md overflow-hidden relative">
            {/*  eslint-disable-next-line @next/next/no-img-element */}
            <Skeleton.Image
              active
              className={cn(
                "!hover:scale-105 !transition-all !object-cover !w-full !h-[210px]",
                {
                  "!w-[240px] !h-[135px]": isLong,
                  // "!h-[150px] !md:h-[210px]": !isLong,
                  // "!w-[225px] !md:w-[315px]": size === "lg" && !isLong,
                }
              )}
            />
          </div>
          <RadialProgress value={0} className="absolute -bottom-4 left-2" />
          <div className="absolute right-2 top-2 cursor-default">
            <div className="w-6 h-6 rounded-full opacity-50 bg-white flex items-center justify-center cursor-pointer hover:bg-primary">
              <FaEllipsisV />
            </div>
          </div>
        </div>
        <div className="py-2 px-1 flex flex-col gap-1">
          <Skeleton.Button active size="small" className="!h-4 !w-full" />
          <Skeleton.Button active size="small" className="!h-2 !w-6" />
          {/* <p className="truncate text-xs font-medium">{formattedDate}</p> */}
        </div>
      </div>
    </div>
  );
};
