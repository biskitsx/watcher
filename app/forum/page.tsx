import { ForumCategoryCard } from "@/components/forum/ForumCategoryCard";
import { Container } from "@/components/layout/Container";
import { getTrendingAll, getUpcomingMovies } from "@/action/movies";
import { tmdbImagesURL } from "@/data/baseUrl";
import { BreadcrumbApp } from "@/components/BreadCrumb";

async function Page() {
  const trendingAll = await getTrendingAll(12);

  return (
    <Container>
      <BreadcrumbApp items={["Home", "Forums"]} />
      <div className="grid grid-cols-2 gap-12">
        <ForumCategoryCard
          category="Movies Discussion"
          cover={trendingAll[4].backdrop_path}
        />
        <ForumCategoryCard
          category="Anime Discussion"
          cover={`https://digital-trans.asia/storage/app/uploads/public/64e/4ed/449/64e4ed4491c23348209561.jpg`}
        />
        <ForumCategoryCard
          category="Series Discussion"
          cover={`https://m.media-amazon.com/images/S/pv-target-images/715cf83eecae70af83c4c354a341363cf9177a7940d1893cdba2ce8c7ab29aa4.jpg`}
        />
        <ForumCategoryCard
          category="General Discussion"
          cover={`https://static0.colliderimages.com/wordpress/wp-content/uploads/2023/04/25-best-action-movies-of-all-time-ranked.jpg`}
        />
      </div>
    </Container>
  );
}

export default Page;
