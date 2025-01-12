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

export default async function Home({
  params: { id },
}: {
  params: { id: string };
}) {
  try {
    const idInt = parseInt(id);
    const recommend = await getContentBaseRecommendations(idInt, "anime");
    const media = await getAnimeById(id);
    const casts = await getAnimeCharacters(id);
    onClickMedia(media.id!, media.type);
    return (
      <PageContainer>
        <MediaDetail media={media} aniemeCasts={casts} />
        <Container>
          <MediaSlider
            name="You may also like"
            items={recommend}
            type="anime"
            href=""
          />
        </Container>
      </PageContainer>
    );
  } catch (error) {
    return <div>error</div>;
  }
}
