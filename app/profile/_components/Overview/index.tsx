import { Container } from "@/components/layout/Container";
import { GenreStats, GenreStatsRadarChart } from "./GenreStatsRadarChart";
import { FaBookmark, FaHeart, FaStar } from "react-icons/fa";
import {
  MediaTotal,
  WatchlistStatusCountResponse,
} from "@/app/api/media/chart/actions";
import { WatchlistStatusPieChart } from "./WatchlistStatusPieChart";

interface OverviewProps {
  stats: GenreStats[];
  mediaTotal: MediaTotal;
  watchlistStatusCount: WatchlistStatusCountResponse;
}
export default function Overview({
  stats,
  mediaTotal,
  watchlistStatusCount,
}: OverviewProps) {
  const total = [
    {
      title: "Total Watchlist",
      value: mediaTotal.watchlistTotal,
      icon: <FaBookmark />,
    },
    {
      title: "Total Ratings",
      value: mediaTotal.ratingTotal,
      icon: <FaStar />,
    },
    {
      title: "Total Favorite",
      value: mediaTotal.favoriteTotal,
      icon: <FaHeart />,
    },
  ];
  return (
    <Container className="py-6">
      <h1 className="text-xl font-bold">Stats</h1>
      <div className="flex gap-4 justify-between">
        {total.map((item, idx) => (
          <div
            className="flex rounded-md shadow-md border p-4 flex-col w-full gap-4"
            key={idx}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">{item.title}</h3>
              <span className="text-gray-400">{item.icon}</span>
            </div>
            <p className="text-2xl font-bold text-primary">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-4 w-full flex-col sm:flex-row">
        <GenreStatsRadarChart stats={stats} />
        <div className="flex rounded-md shadow-md border p-4 flex-col w-full gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Your Watchlist</h3>
            <span className="text-gray-400">
              <FaStar />
            </span>
          </div>
          <WatchlistStatusPieChart
            watchlistStatusCount={watchlistStatusCount}
          />
        </div>
      </div>
    </Container>
  );
}
