import { MediaSlider } from "@/components/media/MediaSlider";
import { MediaCarousel } from "@/components/media/MediaCarousel";
import { Container } from "@/components/layout/Container";
import {
  getAiringTodaySeries,
  getOnTheAirSeries,
  getPopularSeries,
  getTopRatedSeries,
  getTrendingSeries,
} from "@/app/api/serie/actions";
import { PageContainer } from "@/components/layout/PageContainer";
import { InfiniteMedia } from "@/components/infinite-media";

export default async function Home() {
  const airingTodaySeries = await getAiringTodaySeries({ page: 1 });
  const onTheAirSeries = await getOnTheAirSeries({ page: 1 });
  const popularSeries = await getPopularSeries({ page: 1 });
  const topRatedSeries = await getTopRatedSeries({ page: 1 });
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
        <MediaSlider
          href="#"
          items={onTheAirSeries}
          name="On The Air Series"
          type="serie"
        />
        <MediaSlider
          href="#"
          items={popularSeries}
          name="Popular Series"
          type="serie"
        />
        <MediaSlider
          href="#"
          items={topRatedSeries}
          name="Top Rated Series"
          type="serie"
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
