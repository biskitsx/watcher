// "use client";

import { getTrendingAll, getUpcomingMovies } from "@/action/movies";
import { MediaSlider } from "@/components/media/MediaSlider";
import { MediaCarousel } from "@/components/media/MediaCarousel";
import { Container } from "@/components/layout/Container";

export default async function Home() {
  const trendingMovies = (await getTrendingAll(12)) as any[];
  const upcomingMovies = (await getUpcomingMovies(12)) as any[];
  const recommendMovies = (await getTrendingAll(24)) as any[];
  return (
    <Container>
      <MediaCarousel items={upcomingMovies} />
      <MediaSlider
        href="#"
        items={recommendMovies.slice(12, 24)}
        name="Recommend For You"
        type="movies"
      />
      <MediaSlider
        href="#"
        items={trendingMovies}
        name="Trending"
        type="movies"
      />
      <MediaSlider
        href="#"
        items={upcomingMovies}
        type="movies"
        name="Upcoming"
      />
    </Container>
  );
}
