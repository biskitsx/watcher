import { MediaSlider } from "@/components/media/MediaSlider";
import { MediaCarousel } from "@/components/media/MediaCarousel";
import { Container } from "@/components/layout/Container";
import {
  getAiringTodaySeries,
  getTrendingSeries,
} from "@/app/api/serie/actions";
import { PageContainer } from "@/components/layout/PageContainer";
import { InfiniteMedia } from "@/components/infinite-media";

export default async function Home() {
  const airingTodaySeries = await getAiringTodaySeries({ page: 1 });
  const trendingSeries = await getTrendingSeries({ page: 1 });
  return (
    <PageContainer>
      <MediaCarousel items={trendingSeries} />
      <Container>
        <MediaSlider
          href="#"
          items={airingTodaySeries.slice(0, 12)}
          name="Airing Today Series"
          type="serie"
          isLong
        />
        <InfiniteMedia
          fetchData={getTrendingSeries}
          title="Trending Series"
          initialData={trendingSeries}
        />
      </Container>
    </PageContainer>
  );
}
