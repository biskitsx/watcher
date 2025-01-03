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
import { Suspense } from "react";

export default async function Home({
  params: { id },
}: {
  params: { id: string };
}) {
  const media = await getAnimeById(id);
  const anime = await getTopAnime({ page: 1 });
  const casts = await getAnimeCharacters(id);
  return (
    <PageContainer>
      <Suspense fallback={<div>Loading...</div>}>
        <MediaDetail media={media} aniemeCasts={casts} />
      </Suspense>
      <Container>
        <MediaSlider
          name="You may also like"
          items={anime}
          type="anime"
          href=""
        />
      </Container>
    </PageContainer>
  );
}
