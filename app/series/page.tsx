// "use client";

import Image from "next/image";
import { getTrendingAll, getUpcomingMovies } from "@/action/movies";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { MediaSlider } from "@/components/media/MediaSlider";
import { tmdbImagesURL } from "@/data/baseUrl";
import { MediaCarousel } from "@/components/media/MediaCarousel";
import { Container } from "@/components/layout/Container";
import { getAiringTodaySeries } from "@/action/series";

export default async function Home() {
  const airingTodaySeries = await getAiringTodaySeries(12);
  return (
    <Container>
      <MediaCarousel items={airingTodaySeries} />
      <MediaSlider
        href="#"
        items={airingTodaySeries.slice(0, 12)}
        name="Airing Today Series"
        type="series"
      />
      {/* <MediaSlider
        baseUrl={tmdbImagesURL}
        items={trendingMovies}
        name="Trending"
        type="movies"
      />
      <MediaSlider
        baseUrl={tmdbImagesURL}
        items={upcomingMovies}
        type="movies"
        name="Upcoming"
      /> */}
    </Container>
  );
}
