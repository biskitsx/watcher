// "use client";

import Image from "next/image";
import { getTrendingMovies, getUpcomingMovies } from "@/action/movies";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { MediaPagination } from "@/components/media/MediaPagination";
import { tmdbImagesURL } from "@/data/baseUrl";
import { MediaCarousel } from "@/components/media/MediaCarousel";
import { Container } from "@/components/layout/Container";
// import { useEffect, useState } from "react";
// const { Meta } = Card;

export default async function Home() {
  const trendingMovies = await getTrendingMovies(12);
  const upcomingMovies = await getUpcomingMovies(12);

  return (
    <Container>
      <MediaCarousel items={upcomingMovies} />
      <MediaPagination
        baseUrl={tmdbImagesURL}
        items={trendingMovies}
        name="Trending"
        type="movies"
      />
      <MediaPagination
        baseUrl={tmdbImagesURL}
        items={upcomingMovies}
        type="movies"
        name="Upcoming"
      />
    </Container>
  );
}
