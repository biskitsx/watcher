import { getUserRatings, getUserWatchList } from "@/app/api/media/actions";
import ProfilePage from "./_components/ProfilePage";

export default async function Profile() {
  const userWatchList = await getUserWatchList();
  const userRatings = await getUserRatings();
  // return <ProfilePage media={userRatings || []} />;
  return (
    <ProfilePage watchlist={userWatchList || []} ratings={userRatings || []} />
  );
}
