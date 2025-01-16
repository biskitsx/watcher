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
import { getUserBaseRecommendations } from "../api/recommend/actions";
import { JoinToday } from "../components/JoinToday";
import { shouldRenderUserbased } from "../api/media/actions";

export default async function Home() {
  const [
    recommendsSeries,
    trendingSeries,
    airingTodaySeries,
    onTheAirSeries,
    popularSeries,
    topRatedSeries,
    shouldRender,
  ] = await Promise.all([
    getUserBaseRecommendations("serie"),
    getTrendingSeries({ page: 1 }),
    getAiringTodaySeries({ page: 1 }),
    getOnTheAirSeries({ page: 1 }),
    getPopularSeries({ page: 1 }),
    getTopRatedSeries({ page: 1 }),
    shouldRenderUserbased(),
  ]);
  return (
    <PageContainer>
      <MediaCarousel items={trendingSeries} />
      <Container>
        <MediaSlider
          href="#"
          items={recommendsSeries}
          name="Recommended For You"
          type="serie"
          shouldRender={shouldRender}
        />
        <MediaSlider
          href="#"
          items={airingTodaySeries.slice(0, 12)}
          name="Airing Today Series"
          type="serie"
          isLong
        />
      </Container>
      <JoinToday media={airingTodaySeries[3]} />
      <Container>
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
