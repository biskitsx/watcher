// "use client";

import Image from "next/image";
import { getTrendingMovies, getUpcomingMovies } from "@/action/movies";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { MediaPagination } from "@/components/media/MediaPagination";
import { tmdbImagesURL } from "@/data/baseUrl";
import { MediaCarousel } from "@/components/media/MediaCarousel";
import { Container } from "@/components/layout/Container";
import { HomeCarousel } from "@/components/media/HomeCarousel";
import { PageContainer } from "@/components/layout/PageContainer";

export default async function Home() {
  const trendingMovies = await getTrendingMovies(12);
  const upcomingMovies = await getUpcomingMovies(12);

  return (
    <PageContainer>
      <HomeCarousel items={trendingMovies} />
      {/* <MediaCarousel items={upcomingMovies} /> */}
      <MediaPagination
        baseUrl={tmdbImagesURL}
        items={trendingMovies}
        name="Movies"
        type="movies"
      />
      <MediaPagination
        baseUrl={tmdbImagesURL}
        items={upcomingMovies}
        type="movies"
        name="Series"
      />
    </PageContainer>
  );
}
