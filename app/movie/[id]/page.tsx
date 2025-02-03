import { getCreditsByMovieId, getMovieById } from "@/app/api/movie/actions";
import { MediaSlider } from "@/components/media/MediaSlider";
import { Container } from "@/components/layout/Container";
import { MediaDetail } from "@/components/media/MediaDetail";
import { PageContainer } from "@/components/layout/PageContainer";
import { onClickMedia } from "@/app/api/media/actions";
import { getContentBaseRecommendations } from "@/app/api/recommend/actions";
import { getMediaWatchProviders } from "@/app/watch_providers/actions";

export default async function Home({
  params: { id },
}: {
  params: { id: string };
}) {
  try {
    const idInt = parseInt(id);
    const [credits, providers] = await Promise.all([
      getCreditsByMovieId(id),
      getMediaWatchProviders(idInt, "movie"),
    ]);

    const media = await getMovieById(id);
    const recommend = await getContentBaseRecommendations(
      idInt,
      "movie",
      media
    );
    const mediaWithMultipleRating = recommend[20];

    onClickMedia(media.id!, media.type);
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
            type="movie"
            href="#"
          />
        </Container>
      </PageContainer>
    );
  } catch (error) {
    console.log(error);
    return <div>Something went wrong</div>;
  }
}
