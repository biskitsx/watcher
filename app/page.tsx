// "use client";

import { getTrendingAll, getUpcomingMovies } from "@/action/movies";
import { MediaSlider } from "@/components/media/MediaSlider";
import { HomeCarousel } from "@/components/media/HomeCarousel";
import { PageContainer } from "@/components/layout/PageContainer";
import { Container } from "@/components/layout/Container";
import { getTopAnime } from "@/action/anime";

export default async function Home() {
  const trendingMovies = await getTrendingAll(12);
  const upcomingMovies = await getUpcomingMovies(12);
  const topAnimes = await getTopAnime(12);
  return (
    <PageContainer>
      <HomeCarousel items={trendingMovies} />
      <Container>
        <MediaSlider
          href="/movies"
          items={trendingMovies}
          name="Movies"
          type="movies"
          key={0}
        />
        <MediaSlider
          href="/series"
          items={upcomingMovies}
          type="series"
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
