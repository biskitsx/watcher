import { getUpcomingMovies } from "@/app/api/movie/actions";
import { MediaSlider } from "@/components/media/MediaSlider";
import { HomeCarousel } from "@/components/media/HomeCarousel";
import { PageContainer } from "@/components/layout/PageContainer";
import { Container } from "@/components/layout/Container";
import { getTopAnime } from "@/app/api/anime/actions";
import { getAiringTodaySeries } from "@/app/api/serie/actions";
import { Shape1 } from "./components/svg/shape-1";
import { JoinToday } from "./components/JoinToday";

export default async function Home() {
  const upcomingMovies = await getUpcomingMovies({ page: 1 });
  const series = await getAiringTodaySeries({ page: 1 });
  const topAnimes = await getTopAnime({ page: 1 });
  return (
    <PageContainer>
      <HomeCarousel items={upcomingMovies.splice(0, 8)} />
      <Container className="relative">
        <MediaSlider
          href="/movie"
          items={upcomingMovies}
          name="Movies"
          type="movie"
          key={0}
        />
        {/* <Shape1 className="absolute z-10 -top-0 -right-20" /> */}
        <MediaSlider
          href="/series"
          items={series}
          type="serie"
          name="Series"
          key={1}
          isLong
        />
        <Shape1 className="absolute z-10 top-36 -left-20" />
      </Container>
      {/* <Shape2 className="absolute z-10 top-72 -right-20" /> */}
      <JoinToday media={series[5]} />
      <Container>
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
