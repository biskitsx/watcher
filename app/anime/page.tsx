import { MediaSlider } from "@/components/media/MediaSlider";
import { Container } from "@/components/layout/Container";
import { getTopAnime } from "@/app/api/anime/actions";
import { PageContainer } from "@/components/layout/PageContainer";
import { InfiniteMedia } from "@/components/infinite-media";
import { MediaCarousel } from "@/components/media/MediaCarousel";
import { getUserBaseRecommendations } from "../api/recommend/actions";
import { JoinToday } from "../components/JoinToday";
import { shouldRenderUserbased } from "../api/media/actions";

export default async function Home() {
  const topAnime = await getTopAnime({ page: 1 });
  const recommed = await getUserBaseRecommendations("anime");
  const shouldRender = await shouldRenderUserbased();
  return (
    <PageContainer>
      <MediaCarousel items={topAnime.slice(0, 5)} />
      <Container>
        <MediaSlider
          href="#"
          items={recommed}
          name="Recommended For You"
          type="anime"
          shouldRender={shouldRender}
        />
        <MediaSlider
          href="#"
          items={topAnime.slice(0, 12)}
          name="Top anime"
          type="anime"
          isLong
        />
      </Container>
      <JoinToday media={topAnime[3]} />
      <Container>
        <InfiniteMedia
          initialData={topAnime}
          fetchData={getTopAnime}
          title="More Anime"
        />
      </Container>
    </PageContainer>
  );
}
