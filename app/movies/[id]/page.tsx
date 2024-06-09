import {
  getMovieById,
  getTrendingAll,
  getUpcomingMovies,
} from "@/action/movies";
import { MediaSlider } from "@/components/media/MediaSlider";
import { Container } from "@/components/layout/Container";
import { MediaDetail } from "@/components/media/MediaDetail";
import { PageContainer } from "@/components/layout/PageContainer";

export default async function Home({
  params: { id },
}: {
  params: { id: string };
}) {
  const media = await getMovieById(id);
  const movies = await getUpcomingMovies(12);

  return (
    <PageContainer>
      <MediaDetail media={media} />
      <Container>
        <MediaSlider
          name="You may also like"
          items={movies}
          type="movies"
          href=""
        />
      </Container>
    </PageContainer>
  );
}
