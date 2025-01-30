"use client";
import { Container } from "@/components/layout/Container";
import { PageContainer } from "@/components/layout/PageContainer";
import { RadialProgress } from "@/components/media/RadialProgress";
import { Skeleton } from "antd";
import { FaBookmark, FaHeart, FaStar } from "react-icons/fa";

const Loading = () => {
  const total = [
    {
      title: "Total Watchlist",
      icon: <FaBookmark />,
    },
    {
      title: "Total Ratings",
      icon: <FaStar />,
    },
    {
      title: "Total Favorite",
      icon: <FaHeart />,
    },
  ];
  return (
    <PageContainer className="gap-0">
      {/* <div className=" bg-custom"> */}
      <div className=" bg-custom">
        <Container className="py-12 md:py-24 flex flex-col md:flex-row items-center">
          <div>
            {/* <Avatar size={120} /> */}
            <Skeleton.Avatar active size={120} />
          </div>
          <div className="flex flex-col gap-6 w-full items-center md:items-start">
            <Skeleton.Button active size="large" className="!w-72" />
            {/* <div className="text-3xl font-semibold text-center md:text-start">
            hello,
          </div> */}
            <div className="flex gap-4 justify-center md:justify-start w-full">
              {/* {scores.map((score, index) => ( */}
              <div className="flex items-center gap-3  justify-between">
                <div className="hidden md:block">
                  <RadialProgress
                    value={0}
                    size="48px"
                    thickness="3px"
                    className="text-sm"
                  />
                </div>
                <div className="md:hidden ">
                  <RadialProgress value={0} />
                </div>
                <p className="text-white font-medium text-xs md:text-base">
                  Average <br />
                  Movie Score
                </p>
                <div className="h-full w-[2px] bg-white rounded-md" />
              </div>
              <div className="flex items-center gap-3  justify-between">
                <div className="hidden md:block">
                  <RadialProgress
                    value={0}
                    size="48px"
                    thickness="3px"
                    className="text-sm"
                  />
                </div>
                <div className="md:hidden ">
                  <RadialProgress value={0} />
                </div>
                <p className="text-white font-medium text-xs md:text-base">
                  Average <br />
                  Serie Score
                </p>
                <div className="h-full w-[2px] bg-white rounded-md" />
              </div>
              <div className="flex items-center gap-3  justify-between">
                <div className="hidden md:block">
                  <RadialProgress
                    value={0}
                    size="48px"
                    thickness="3px"
                    className="text-sm"
                  />
                </div>
                <div className="md:hidden ">
                  <RadialProgress value={0} />
                </div>
                <p className="text-white font-medium text-xs md:text-base">
                  Average <br />
                  Anime Score
                </p>
              </div>
              {/* ))} */}
            </div>
          </div>
        </Container>
      </div>
      <div className="flex items-center justify-center gap-8 p-2 border-b border-b-gray-300">
        <Skeleton.Button active size="small" className="!w-10" />
        <Skeleton.Button active size="small" className="!w-10" />
        <Skeleton.Button active size="small" className="!w-10" />
        <Skeleton.Button active size="small" className="!w-10" />
      </div>
      <Container className="py-6 relative">
        <div className="flex justify-between items-center z-20">
          <h1 className="text-xl font-bold">Overview</h1>
          <Skeleton.Button active size="small" />
        </div>
        <div className="flex gap-4 justify-between z-20">
          {total.map((item, idx) => (
            <div
              className="flex rounded-md shadow-md border p-4 flex-col w-full gap-4"
              key={idx}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <span className="text-gray-400">{item.icon}</span>
              </div>{" "}
              <Skeleton.Button active className="!w-1" style={{ width: 10 }} />
            </div>
          ))}
        </div>
        <div className="flex gap-4 w-full flex-col sm:flex-row z-20">
          <div className="flex rounded-md shadow-md border p-4 flex-col w-full gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Your Favoirte Genre</h3>
              <span className="text-gray-400">
                <FaStar />
              </span>
            </div>
            <Skeleton.Button active className="!w-full !h-32" />
          </div>
          <div className="flex rounded-md shadow-md border p-4 flex-col w-full gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Your Watchlist</h3>
              <span className="text-gray-400">
                <FaStar />
              </span>
            </div>
            <Skeleton.Button active className="!w-full !h-32" />
          </div>
        </div>
      </Container>
    </PageContainer>
  );
};
export default Loading;
