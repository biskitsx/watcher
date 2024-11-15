"use server";
import { Container } from "@/components/layout/Container";
import { SearchPage } from "./_components/SearchPage";
import { getUpcomingMovies, searchMovie } from "../api/movie/actions";
import { PageContainer } from "@/components/layout/PageContainer";

export default async function Home() {
  const media = await getUpcomingMovies({ page: 1 });
  const firstMedia = media[0];
  return (
    <PageContainer>
      <SearchPage bannerMedia={firstMedia} />
    </PageContainer>
  );
}
