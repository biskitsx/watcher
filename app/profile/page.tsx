import { getUserRatings, getUserWatchList } from "@/app/api/media/actions";
import ProfilePage from "./_components/ProfilePage";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOption";

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
    return (
      <ProfilePage
        watchlist={userWatchList || []}
        ratings={userRatings || []}
        user={user}
      />
    );
  } catch (error) {
    return <div>Something went wrong</div>;
  }
}
