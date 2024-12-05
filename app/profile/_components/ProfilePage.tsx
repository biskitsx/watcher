"use client";

import { Container } from "@/components/layout/Container";
import { PageContainer } from "@/components/layout/PageContainer";
import { Avatar } from "antd";
import { useSession } from "next-auth/react";
import { ProfileTabs } from "./ProfileTabs";
import { Media } from "@prisma/client";
import { RadialProgress } from "@/components/media/RadialProgress";
import { MediaAverageScore } from "@/app/api/media/actions";
import {
  MediaByYear,
  MediaTotal,
  WatchlistStatusCountResponse,
} from "@/app/api/media/chart/actions";
import { GenreStats } from "./Overview/GenreStatsRadarChart";

interface ProfilePageProps {
  watchlist: Media[];
  ratings: Media[];
  user: any;
  initialAverageScore: MediaAverageScore;
  initialRatingCountByYear: MediaByYear[];
  initialWatchlistCountByYear: MediaByYear[];
  initialGenreStats: GenreStats[];
  initialMediaTotal: MediaTotal;
  watchlistStatusCount: WatchlistStatusCountResponse;
}

export default function ProfilePage({
  watchlist,
  ratings,
  user,
  initialAverageScore,
  initialRatingCountByYear,
  initialWatchlistCountByYear,
  initialGenreStats,
  initialMediaTotal,
  watchlistStatusCount,
}: ProfilePageProps) {
  const movieAvgScore = initialAverageScore.movieAvg * 10;
  const serieAvgScore = initialAverageScore.serieAvg * 10;
  const animeAvgScore = initialAverageScore.animeAvg * 10;
  const image = user?.image;
  return (
    <PageContainer className="gap-0">
      {/* <div className=" bg-custom"> */}
      <div className=" bg-custom">
        <Container className="py-12 md:py-24 flex flex-col md:flex-row items-center">
          <div>
            <Avatar size={120} src={image} />
          </div>
          <div className="flex flex-col gap-6 w-full">
            <div className="text-3xl font-semibold text-center md:text-start">
              hello, {user?.name}
            </div>
            <div className="flex gap-4 justify-center md:justify-start w-full">
              {/* {scores.map((score, index) => ( */}
              <div className="flex items-center gap-3  justify-between">
                <div className="hidden md:block">
                  <RadialProgress
                    value={movieAvgScore}
                    size="48px"
                    thickness="3px"
                    className="text-sm"
                  />
                </div>
                <div className="md:hidden ">
                  <RadialProgress value={movieAvgScore} />
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
                    value={serieAvgScore}
                    size="48px"
                    thickness="3px"
                    className="text-sm"
                  />
                </div>
                <div className="md:hidden ">
                  <RadialProgress value={serieAvgScore} />
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
                    value={animeAvgScore}
                    size="48px"
                    thickness="3px"
                    className="text-sm"
                  />
                </div>
                <div className="md:hidden ">
                  <RadialProgress value={animeAvgScore} />
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
      <ProfileTabs
        watchlistStatusCount={watchlistStatusCount}
        watchlist={watchlist}
        ratings={ratings}
        initialRatingCountByYear={initialRatingCountByYear}
        initialWatchlistCountByYear={initialWatchlistCountByYear}
        initialGenreStats={initialGenreStats}
        initialMediaTotal={initialMediaTotal}
      />
    </PageContainer>
  );
}
