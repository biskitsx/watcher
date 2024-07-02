import { ForumCategoryCard } from "@/components/forum/ForumCategoryCard";
import { Container } from "@/components/layout/Container";
import { getTrendingAll, getUpcomingMovies } from "@/app/api/movie/actions";
import { tmdbImagesURL } from "@/data/baseUrl";
import { BreadcrumbApp } from "@/components/BreadCrumb";
import { useParams } from "next/navigation";
import { MediaCard } from "@/components/media/MediaCard";
import { MediaTaps } from "@/components/MediaTabs";

async function Page() {
  const trendingAll = await getTrendingAll(12);

  return (
    <Container>
      <div className="flex gap-2 flex-col">
        <BreadcrumbApp />
        <h1 className="text-3xl font-semibold">Movies Recommendation</h1>
        <MediaTaps trendingAll={trendingAll} />
      </div>
    </Container>
  );
}

export default Page;
