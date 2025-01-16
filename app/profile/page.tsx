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
    const session = await getServerSession(authOptions);

    if (!session) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const [
      userWatchlist,
      userRatings,
      avgs,
      genreStats,
      mediaTotal,
      watchlistStatusCount,
      initialRatingCountByYear,
      initialWatchlistCountByYear,
    ] = await Promise.all([
      getUserWatchList(),
      getUserRatings(),
      getMediaAverage(),
      getGenreStats(),
      getMediaTotal(),
      getWatchlistStatusCount(),
      getRatingCountByYearOfMediaReleaseDate(),
      getWatchlistCountByYearOfMediaReleaseDate(),
    ]);
    const user = session.user;
    return (
      <ProfilePage
        watchlistStatusCount={watchlistStatusCount}
        watchlist={userWatchlist || []}
        ratings={userRatings || []}
        user={user}
        initialAverageScore={avgs}
        initialRatingCountByYear={initialRatingCountByYear || []}
        initialWatchlistCountByYear={initialWatchlistCountByYear || []}
        initialGenreStats={genreStats || []}
        initialMediaTotal={mediaTotal}
      />
    );
  } catch (error) {
    return <div>Something went wrong</div>;
  }
}
