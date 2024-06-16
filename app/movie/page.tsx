import { getTrendingAll, getUpcomingMovies } from "@/action/movies";
import { MediaSlider } from "@/components/media/MediaSlider";
import { MediaCarousel } from "@/components/media/MediaCarousel";
import { Container } from "@/components/layout/Container";
import { PageContainer } from "@/components/layout/PageContainer";
import { Suspense } from "react";

export default async function Home() {
  const trendingMovies = await getTrendingAll(12);
  const upcomingMovies = await getUpcomingMovies(12);
  const recommendMovies = await getTrendingAll(24);
  return (
    <PageContainer>
      <MediaCarousel items={upcomingMovies} />
      <Container>
        <Suspense fallback={<div>Loading...</div>}>
          <MediaSlider
            href="#"
            items={recommendMovies?.slice(12, 24)}
            name="Recommend For You"
            type="movie"
          />
        </Suspense>
        <MediaSlider
          href="#"
          items={trendingMovies}
          name="Trending"
          type="movie"
        />
        <MediaSlider
          href="#"
          items={upcomingMovies}
          type="movie"
          name="Upcoming"
        />
      </Container>
    </PageContainer>
  );
}
