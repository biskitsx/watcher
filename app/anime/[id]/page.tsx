import { MediaSlider } from "@/components/media/MediaSlider";
import { Container } from "@/components/layout/Container";
import { MediaDetail } from "@/components/media/MediaDetail";
import { PageContainer } from "@/components/layout/PageContainer";
import { getAnimeById, getTopAnime } from "@/app/api/anime/actions";

export default async function Home({
  params: { id },
}: {
  params: { id: string };
}) {
  const media = await getAnimeById(id);
  const anime = await getTopAnime({ page: 1 });
  console.log(media.genres);
  return (
    <PageContainer>
      <MediaDetail media={media} />
      <Container>
        <MediaSlider
          name="You may also like"
          items={anime}
          type="anime"
          href=""
        />
      </Container>
    </PageContainer>
  );
}
