import { getTrendingAll, getUpcomingMovies } from "@/app/api/movie/actions";
import { MediaSlider } from "@/components/media/MediaSlider";
import { MediaCarousel } from "@/components/media/MediaCarousel";
import { Container } from "@/components/layout/Container";
import { PageContainer } from "@/components/layout/PageContainer";
import { Suspense } from "react";
import { InfiniteMedia } from "@/components/infinite-media";

export default async function Home() {
  const upcomingMovies = await getUpcomingMovies({ page: 1 });
  const recommendMovies = await getTrendingAll();
  return (
    <PageContainer>
      <MediaCarousel items={upcomingMovies} />
      <Container>
        <Suspense fallback={<div>Loading...</div>}>
          <MediaSlider
            href="#"
            items={upcomingMovies?.slice(12, 24)}
            name="Recommend For You"
            type="movie"
            isLong
          />
        </Suspense>
        <InfiniteMedia
          title="Upcoming Movies"
          initialData={upcomingMovies}
          fetchData={getUpcomingMovies}
        />
      </Container>
    </PageContainer>
  );
}