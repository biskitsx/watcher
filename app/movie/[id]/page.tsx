import { getCreditsByMovieId, getMovieById } from "@/app/api/movie/actions";
import { MediaSlider } from "@/components/media/MediaSlider";
import { Container } from "@/components/layout/Container";
import { MediaDetail } from "@/components/media/MediaDetail";
import { PageContainer } from "@/components/layout/PageContainer";
import { onClickMedia } from "@/app/api/media/actions";
import { getContentBaseRecommendations } from "@/app/api/recommend/actions";

export default async function Home({
  params: { id },
}: {
  params: { id: string };
}) {
  try {
    const idInt = parseInt(id);
    const [media, credits] = await Promise.all([
      getMovieById(id),
      getCreditsByMovieId(id),
    ]);

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
