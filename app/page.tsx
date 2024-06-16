// "use client";

import { getTrendingAll, getUpcomingMovies } from "@/action/movies";
import { MediaSlider } from "@/components/media/MediaSlider";
import { HomeCarousel } from "@/components/media/HomeCarousel";
import { PageContainer } from "@/components/layout/PageContainer";
import { Container } from "@/components/layout/Container";
import { getTopAnime } from "@/action/anime";
import { getAiringTodaySeries } from "@/action/series";

export default async function Home() {
  const upcomingMovies = await getUpcomingMovies(12);
  const series = await getAiringTodaySeries(12);
  const topAnimes = await getTopAnime(12);
  return (
    <PageContainer>
      <HomeCarousel items={upcomingMovies} />
      <Container>
        <MediaSlider
          href="/movies"
          items={upcomingMovies}
          name="Movies"
          type="movie"
          key={0}
        />
        <MediaSlider
          href="/series"
          items={series}
          type="serie"
          name="Series"
          key={1}
        />
        <MediaSlider
          href="/anime"
          items={topAnimes}
          type="anime"
          name="Anime"
          key={2}
        />
      </Container>
    </PageContainer>
  );
}
