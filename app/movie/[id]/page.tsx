import {
  getCreditsByMovieId,
  getMovieById,
  getTrendingAll,
  getUpcomingMovies,
} from "@/app/api/movie/actions";
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
  const credits = await getCreditsByMovieId(id);
  return (
    <PageContainer>
      <MediaDetail media={media} casts={credits.cast} />
      <Container>
        <MediaSlider
          name="You may also like"
          items={movies}
          type="movie"
          href=""
        />
      </Container>
    </PageContainer>
  );
}
