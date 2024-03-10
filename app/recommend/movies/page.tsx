import { ForumCategoryCard } from "@/components/forum/ForumCategoryCard";
import { Container } from "@/components/layout/Container";
import { getTrendingAll, getUpcomingMovies } from "@/action/movies";
import { tmdbImagesURL } from "@/data/baseUrl";
import { BreadcrumbApp } from "@/components/BreadCrumb";
import { useParams } from "next/navigation";
import { MediaCard } from "@/components/media/MediaCard";
import { MediaTaps } from "@/components/MediaTabs";

async function Page() {
  const trendingAll = await getTrendingAll(12);

  return (
    <Container>
      <BreadcrumbApp />
      <h1 className="text-3xl">Movies Recommendation</h1>
      <MediaTaps trendingAll={trendingAll} />
      {/* <div className="flex flex-wrap gap-6 justify-between">
        {trendingAll &&
          trendingAll.map((movie) => (
            <MediaCard
              cover={movie.poster_path}
              title={movie.title}
              release_date={movie.release_date}
            />
          ))}
      </div> */}
    </Container>
  );
}

export default Page;
