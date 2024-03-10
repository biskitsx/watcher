// "use client";
import { MediaSlider } from "@/components/media/MediaSlider";
import { MediaCarousel } from "@/components/media/MediaCarousel";
import { Container } from "@/components/layout/Container";
import { getSearchAnime, getTopAnime } from "@/action/anime";

export default async function Home() {
  const topAnime = await getTopAnime(12);
  const search = await getSearchAnime("naruto");
  console.log(search);
  return (
    <Container>
      <MediaCarousel items={topAnime} />
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
  );
}
