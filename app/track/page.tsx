import { ForumCategoryCard } from "@/components/forum/ForumCategoryCard";
import { Container } from "@/components/layout/Container";
import { getTrendingAll, getUpcomingMovies } from "@/action/movies";
import { tmdbImagesURL } from "@/data/baseUrl";
import { BreadcrumbApp } from "@/components/BreadCrumb";
import { TrackTable } from "@/components/table/TrackTable";

async function Page() {
  const trendingMovies = (await getTrendingAll(12)) as any[];

  return (
    <Container>
      <BreadcrumbApp />
      <TrackTable media={trendingMovies} />
    </Container>
  );
}

export default Page;
