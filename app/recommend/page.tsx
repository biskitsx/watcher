import { ForumCategoryCard } from "@/components/forum/ForumCategoryCard";
import { Container } from "@/components/layout/Container";
import { getTrendingAll, getUpcomingMovies } from "@/app/api/movie/actions";
import { tmdbImagesURL } from "@/data/baseUrl";
import { BreadcrumbApp } from "@/components/BreadCrumb";

async function Page() {
  const trendingAll = await getTrendingAll(12);
  return (
    <Container>
      <div className="flex gap-2 flex-col">
        <BreadcrumbApp />
        <h1 className="text-3xl font-semibold">Recommendation</h1>
      </div>
      <div className="grid grid-cols-2 gap-12">
        <ForumCategoryCard
          category="Movies Recommendation"
          cover={trendingAll[4]?.backdrop_path}
          href="/recommend/movies"
        />
        <ForumCategoryCard
          category="Anime Recommendation"
          cover={`https://digital-trans.asia/storage/app/uploads/public/64e/4ed/449/64e4ed4491c23348209561.jpg`}
          href="/recommend/anime"
        />
        <ForumCategoryCard
          category="Series Recommendation"
          cover={`https://m.media-amazon.com/images/S/pv-target-images/715cf83eecae70af83c4c354a341363cf9177a7940d1893cdba2ce8c7ab29aa4.jpg`}
          href="/recommend/series"
        />
      </div>
    </Container>
  );
}

export default Page;
