// "use client";
import { MediaSlider } from "@/components/media/MediaSlider";
import { MediaCarousel } from "@/components/media/MediaCarousel";
import { Container } from "@/components/layout/Container";
import { getSearchAnime, getTopAnime } from "@/action/anime";
import { PageContainer } from "@/components/layout/PageContainer";

export default async function Home() {
  const topAnime = await getTopAnime(12);
  return (
    <PageContainer>
      <MediaCarousel items={topAnime} />
      <Container>
        <MediaSlider
          href="#"
          items={topAnime.slice(0, 12)}
          name="Top anime"
          type="anime"
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
    </PageContainer>
  );
}
