import { MediaSlider } from "@/components/media/MediaSlider";
import { MediaCarousel } from "@/components/media/MediaCarousel";
import { Container } from "@/components/layout/Container";
import { getAiringTodaySeries, getTrendingSeries } from "@/action/series";
import { PageContainer } from "@/components/layout/PageContainer";

export default async function Home() {
  const airingTodaySeries = await getAiringTodaySeries(12);
  const trendingSeries = await getTrendingSeries(12);
  return (
    <PageContainer>
      <MediaCarousel items={trendingSeries} />
      <Container>
        <MediaSlider
          href="#"
          items={airingTodaySeries.slice(0, 12)}
          name="Airing Today Series"
          type="serie"
        />
      </Container>
    </PageContainer>
  );
}
