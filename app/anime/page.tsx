// "use client";
import { MediaSlider } from "@/components/media/MediaSlider";
import { MediaCarousel } from "@/components/media/MediaCarousel";
import { Container } from "@/components/layout/Container";
import { searchAnime, getTopAnime } from "@/app/api/anime/actions";
import { PageContainer } from "@/components/layout/PageContainer";
import { InfiniteMedia } from "@/components/infinite-media";

export default async function Home() {
  const topAnime = await getTopAnime({ page: 1 });
  return (
    <PageContainer>
      <MediaCarousel items={topAnime} />
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
