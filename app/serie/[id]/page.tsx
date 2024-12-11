import { MediaSlider } from "@/components/media/MediaSlider";
import { Container } from "@/components/layout/Container";
import { MediaDetail } from "@/components/media/MediaDetail";
import { PageContainer } from "@/components/layout/PageContainer";
import {
  getCreditsBySerieId,
  getSeriesById,
  getTrendingSeries,
} from "@/app/api/serie/actions";
import { onClickMedia } from "@/app/api/media/actions";

export default async function Home({
  params: { id },
}: {
  params: { id: string };
}) {
  const media = await getSeriesById(id);
  const series = await getTrendingSeries({ page: 1 });
  const credits = await getCreditsBySerieId(id);
  await onClickMedia(media.id!, media.type);

  return (
    <PageContainer>
      <MediaDetail media={media} casts={credits.cast} />
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
