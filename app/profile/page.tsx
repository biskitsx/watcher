import {
  getMediaAverage,
  getUserRatings,
  getUserWatchList,
} from "@/app/api/media/actions";
import ProfilePage from "./_components/ProfilePage";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOption";
import {
  getGenreStats,
  getMediaTotal,
  getRatingCountByYearOfMediaReleaseDate,
  getWatchlistCountByYearOfMediaReleaseDate,
  getWatchlistStatusCount,
} from "../api/media/chart/actions";

export default async function Profile() {
  try {
    const userWatchList = await getUserWatchList();
    const userRatings = await getUserRatings();
    const session = await getServerSession(authOptions);
    if (!session) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const user = session.user;
    const avgs = await getMediaAverage();
    const ratingCountByYear = await getRatingCountByYearOfMediaReleaseDate();
    const watchlistCountByYear =
      await getWatchlistCountByYearOfMediaReleaseDate();
    const genreStats = await getGenreStats();
    const mediaTotal = await getMediaTotal();
    const watchlistStatusCount = await getWatchlistStatusCount();
    return (
      <ProfilePage
        watchlistStatusCount={watchlistStatusCount}
        watchlist={userWatchList || []}
        ratings={userRatings || []}
        user={user}
        initialAverageScore={avgs}
        initialRatingCountByYear={ratingCountByYear || []}
        initialWatchlistCountByYear={watchlistCountByYear || []}
        initialGenreStats={genreStats || []}
        initialMediaTotal={mediaTotal}
      />
    );
  } catch (error) {
    return <div>Something went wrong</div>;
  }
}
