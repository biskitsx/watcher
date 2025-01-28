import { MediaSlider } from "@/components/media/MediaSlider";
import { Container } from "@/components/layout/Container";
import { MediaDetail } from "@/components/media/MediaDetail";
import { PageContainer } from "@/components/layout/PageContainer";
import {
  getAnimeById,
  getAnimeCharacters,
  getTopAnime,
} from "@/app/api/anime/actions";
import { onClickMedia } from "@/app/api/media/actions";
import { getContentBaseRecommendations } from "@/app/api/recommend/actions";
import { Suspense } from "react";
import { MediaDetailLoading } from "@/app/components/Loading/MediaID/MediaDetailLoading";
import { MediaSliderLoading } from "@/app/components/Loading/MediaSlider";

export default async function Home({
  params: { id },
}: {
  params: { id: string };
}) {
  try {
    const idInt = parseInt(id);
    const [media, casts] = await Promise.all([
      getAnimeById(id),
      getAnimeCharacters(id),
    ]);
    onClickMedia(media.id!, media.type);

    const recommend = await getContentBaseRecommendations(
      idInt,
      "anime",
      media
    );

    const mediaWithMultipleRating = recommend[20];

    console.log(mediaWithMultipleRating);
    return (
      <PageContainer>
        <Suspense fallback={<MediaDetailLoading />}>
          <MediaDetail
            media={!!mediaWithMultipleRating ? mediaWithMultipleRating : media}
            aniemeCasts={casts}
          />
        </Suspense>
        <Container>
          <Suspense fallback={<MediaSliderLoading />}>
            <MediaSlider
              name="You may also like"
              items={recommend}
              type="anime"
              href="#"
            />
          </Suspense>
        </Container>
      </PageContainer>
    );
  } catch (error) {
    return <div>error</div>;
  }
}
