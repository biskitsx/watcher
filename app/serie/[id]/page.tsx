import { MediaSlider } from "@/components/media/MediaSlider";
import { Container } from "@/components/layout/Container";
import { MediaDetail } from "@/components/media/MediaDetail";
import { PageContainer } from "@/components/layout/PageContainer";
import { getCreditsBySerieId, getSeriesById } from "@/app/api/serie/actions";
import { onClickMedia } from "@/app/api/media/actions";
import { getContentBaseRecommendations } from "@/app/api/recommend/actions";

export default async function Home({
  params: { id },
}: {
  params: { id: string };
}) {
  try {
    const media = await getSeriesById(id);
    const idInt = parseInt(id);
    const recommend = await getContentBaseRecommendations(idInt, "serie");
    const credits = await getCreditsBySerieId(id);
    await onClickMedia(media.id!, media.type);

    return (
      <PageContainer>
        <MediaDetail media={media} casts={credits.cast} />
        <Container>
          <MediaSlider
            name="You may also like"
            items={recommend}
            type="serie"
            href=""
          />
        </Container>
      </PageContainer>
    );
  } catch (error) {
    return <div>error</div>;
  }
}
