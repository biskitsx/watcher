import { getTrendingMovies, getUpcomingMovies } from "@/action/movies";

async function Page() {
  const upcomingMovies = await getUpcomingMovies(12);

  return <div>This is Forum</div>;
}

export default Page;
