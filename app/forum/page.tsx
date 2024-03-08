import { ForumCategoryCard } from "@/components/forum/ForumCategoryCard";
import { Container } from "@/components/layout/Container";
import { getTrendingMovies, getUpcomingMovies } from "@/action/movies";
import { tmdbImagesURL } from "@/data/baseUrl";
import { BreadcrumbApp } from "@/components/BreadCrumb";

async function Page() {
  const trendingMovies = (await getTrendingMovies(12)) as any[];

  return (
    <Container>
      <BreadcrumbApp items={["Home", "Forums"]} />
      <div className="grid grid-cols-2 gap-12">
        <ForumCategoryCard
          category="Movies Discussion"
          cover={`${tmdbImagesURL}/${trendingMovies[4].backdrop_path}`}
        />
        <ForumCategoryCard
          category="Anime Discussion"
          cover={`https://digital-trans.asia/storage/app/uploads/public/64e/4ed/449/64e4ed4491c23348209561.jpg`}
        />
        <ForumCategoryCard
          category="Series Discussion"
          cover={`https://fomacs.org/wp-content/uploads/2016/12/series_TV.jpg`}
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
