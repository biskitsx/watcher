"use server";
import { SearchPage } from "./_components/SearchPage";
import { getUpcomingMovies } from "../api/movie/actions";
import { PageContainer } from "@/components/layout/PageContainer";

export default async function Home() {
  const media = await getUpcomingMovies({ page: 1 });
  const selectedMedia = media[2];
  return (
    <PageContainer>
      <SearchPage bannerMedia={selectedMedia} />
    </PageContainer>
  );
}
