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
      <div className="flex gap-2 flex-col">
        <BreadcrumbApp />
        <h1 className="text-3xl font-semibold">Track</h1>
      </div>
      <TrackTable media={trendingMovies} />
    </Container>
  );
}

export default Page;
