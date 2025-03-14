import { MediaSlider } from "@/components/media/MediaSlider";
import { Container } from "@/components/layout/Container";
import { MediaDetail } from "@/components/media/MediaDetail";
import { PageContainer } from "@/components/layout/PageContainer";
import { getCreditsBySerieId, getSeriesById } from "@/app/api/serie/actions";
import { onClickMedia } from "@/app/api/media/actions";
import { getContentBaseRecommendations } from "@/app/api/recommend/actions";
import { get } from "http";
import { getMediaWatchProviders } from "@/app/watch_providers/actions";

export default async function Home({
  params: { id },
}: {
  params: { id: string };
}) {
  try {
    const idInt = parseInt(id);
    const [media, credits, providers] = await Promise.all([
      getSeriesById(id),
      getCreditsBySerieId(id),
      getMediaWatchProviders(idInt, "tv"),
    ]);
    const recommend = await getContentBaseRecommendations(
      idInt,
      "serie",
      media
    );
    onClickMedia(media.id!, media.type);

    const mediaWithMultipleRating = recommend[20];

    return (
      <PageContainer>
        <MediaDetail
          media={!!mediaWithMultipleRating ? mediaWithMultipleRating : media}
          casts={credits.cast}
          providers={providers}
        />
        <Container>
          <MediaSlider
            name="You may also like"
            items={recommend}
            type="serie"
            href="#"
          />
        </Container>
      </PageContainer>
    );
  } catch (error) {
    return <div>error</div>;
  }
}
