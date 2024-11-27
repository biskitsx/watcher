import { getUpcomingMovies } from "@/app/api/movie/actions";
import { MediaSlider } from "@/components/media/MediaSlider";
import { HomeCarousel } from "@/components/media/HomeCarousel";
import { PageContainer } from "@/components/layout/PageContainer";
import { Container } from "@/components/layout/Container";
import { getTopAnime } from "@/app/api/anime/actions";
import { getAiringTodaySeries } from "@/app/api/serie/actions";
import { RadialProgressShadCN } from "@/components/radial-progress";

export default async function Home() {
  const upcomingMovies = await getUpcomingMovies({ page: 1 });
  const series = await getAiringTodaySeries({ page: 1 });
  const topAnimes = await getTopAnime({ page: 1 });
  return (
    <PageContainer>
      <HomeCarousel items={upcomingMovies.splice(0, 8)} />
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
          isLong
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
