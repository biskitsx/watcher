import {
  getMovieById,
  getTrendingAll,
  getUpcomingMovies,
} from "@/action/movies";
import { MediaSlider } from "@/components/media/MediaSlider";
import { Container } from "@/components/layout/Container";
import { MediaDetail } from "@/components/media/MediaDetail";
import { PageContainer } from "@/components/layout/PageContainer";
import { getSeriesById, getTrendingSeries } from "@/action/series";

export default async function Home({
  params: { id },
}: {
  params: { id: string };
}) {
  const media = await getSeriesById(id);
  const series = await getTrendingSeries(12);

  return (
    <PageContainer>
      <MediaDetail media={media} />
      <Container>
        <MediaSlider
          name="You may also like"
          items={series}
          type="serie"
          href=""
        />
      </Container>
    </PageContainer>
  );
}
