import { RadialProgress } from "@/components/media/RadialProgress";
import { Badge, Skeleton } from "antd";

interface MediaCardHorizontalLoadingProps {}
export const MediaCardHorizontalLoading =
  ({}: MediaCardHorizontalLoadingProps) => {
    return (
      <div className="flex rounded-md shadow-md border overflow-hidden transition-all duration-300 ">
        <aside className="">
          <Skeleton.Image className="!w-[150px] !h-full" active />
        </aside>
        <main className="w-full p-4  overflow-x-scroll hide-scrollbar flex flex-col justify-between gap-4 md: gap-8">
          <div className="flex  items-center gap-2">
            <div>
              <RadialProgress
                value={0}
                className="text-xs"
                size="38px"
                // thickness="3px"
              />
            </div>
            <div className="flex-col gap-2 flex">
              <Skeleton.Input active />
              <Skeleton.Input size="small" active />
              {/* <Link className="sm:text-lg font-bold text-nowrap" href={href}>
                {media.mediaTitle}
                </Link>
            <p className="">{date}</p> */}
            </div>
          </div>
          <div>
            <p className="line-clamp-1 sm:line-clamp-3 text-black"></p>
            <Skeleton.Input size="large" className="!w-full" active />
          </div>
          <div className="flex gap-3 text-gray-500">
            <div className="flex gap-2">
              <Skeleton.Button size="small" active shape="circle" />
              <Skeleton.Input size="small" active />
            </div>
            <div className="flex gap-2">
              <Skeleton.Button size="small" active shape="circle" />
              <Skeleton.Input size="small" active />
            </div>
            <div className="flex gap-2">
              <Skeleton.Button size="small" active shape="circle" />
              <Skeleton.Input size="small" active />
            </div>
            <div className="flex gap-2">
              <Skeleton.Button size="small" active shape="circle" />
              <Skeleton.Input size="small" active />
            </div>
          </div>
        </main>
      </div>
    );
  };
