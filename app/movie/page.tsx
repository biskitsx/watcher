import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/app/api/movie/actions";
import { MediaSlider } from "@/components/media/MediaSlider";
import { MediaCarousel } from "@/components/media/MediaCarousel";
import { Container } from "@/components/layout/Container";
import { PageContainer } from "@/components/layout/PageContainer";
import { Suspense } from "react";
import { InfiniteMedia } from "@/components/infinite-media";
import { JoinToday } from "../components/JoinToday";
import { getUserBaseRecommendations } from "../api/recommend/actions";
import { shouldRenderUserbased } from "../api/media/actions";
import { Shape1 } from "../components/svg/shape-1";
import { Shape2 } from "../components/svg/shape-2";

export default async function Home() {
  const [
    recommend,
    upcomingMovies,
    popularMovies,
    topRatedMovies,
    nowPlayingMovies,
  ] = await Promise.all([
    getUserBaseRecommendations("movie"),
    getUpcomingMovies({ page: 1 }),
    getPopularMovies(),
    getTopRatedMovies(),
    getNowPlayingMovies(),
  ]);

  const shouldRender = await shouldRenderUserbased();
  return (
    <PageContainer>
      <MediaCarousel items={upcomingMovies} />
      <Container className="relative">
        <Suspense fallback={<div>Loading...</div>}>
          <MediaSlider
            href="#"
            items={recommend}
            name="Recommend For You"
            type="movie"
            shouldRender={shouldRender}
          />
          <MediaSlider
            href="#"
            items={popularMovies}
            name="Popular Movies"
            type="movie"
            isLong
          />
        </Suspense>
        <Shape2 className="absolute z-10 top-36 -left-20" />
      </Container>
      <JoinToday media={popularMovies[0]} />
      <Container className="relative">
        <Suspense fallback={<div>Loading...</div>}>
          <Shape1 className="absolute z-10 top-36 -right-20" />
          <MediaSlider
            href="#"
            items={topRatedMovies}
            name="Top Rated Movies"
            type="movie"
          />
          <MediaSlider
            href="#"
            items={nowPlayingMovies}
            name="Now Playing Movies"
            type="movie"
          />
          <InfiniteMedia
            title="Upcoming Movies"
            initialData={upcomingMovies}
            fetchData={getUpcomingMovies}
          />
        </Suspense>
      </Container>
    </PageContainer>
  );
}
