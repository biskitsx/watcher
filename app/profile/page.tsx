import {
  getMediaAverage,
  getUserRatings,
  getUserWatchList,
} from "@/app/api/media/actions";
import ProfilePage from "./_components/ProfilePage";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOption";
import {
  getRatingCountByYearOfMediaReleaseDate,
  getWatchlistCountByYearOfMediaReleaseDate,
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
    return (
      <ProfilePage
        watchlist={userWatchList || []}
        ratings={userRatings || []}
        user={user}
        initialAverageScore={avgs}
        initialRatingCountByYear={ratingCountByYear || []}
        initialWatchlistCountByYear={watchlistCountByYear || []}
      />
    );
  } catch (error) {
    return <div>Something went wrong</div>;
  }
}
