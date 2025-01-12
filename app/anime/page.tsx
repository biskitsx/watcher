import { MediaSlider } from "@/components/media/MediaSlider";
import { Container } from "@/components/layout/Container";
import { getTopAnime } from "@/app/api/anime/actions";
import { PageContainer } from "@/components/layout/PageContainer";
import { InfiniteMedia } from "@/components/infinite-media";
import { MediaCarousel } from "@/components/media/MediaCarousel";

export default async function Home() {
  const topAnime = await getTopAnime({ page: 1 });
  return (
    <PageContainer>
      <MediaCarousel items={topAnime.slice(0, 5)} />
      <Container>
        <MediaSlider
          href="#"
          items={topAnime.slice(0, 12)}
          name="Top anime"
          type="anime"
          isLong
        />
        <InfiniteMedia
          initialData={topAnime}
          fetchData={getTopAnime}
          title="More Anime"
        />
      </Container>
    </PageContainer>
  );
}
