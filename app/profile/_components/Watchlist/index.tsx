import {
  getUserRatings,
  getUserWatchList,
  SortBy,
  updateWatchlistStatus,
} from "@/app/api/media/actions";
import { MediaByYear } from "@/app/api/media/chart/actions";
import { AreaChartByYear } from "@/app/components/AreaChartByYear";
import { MediaCardHorizontal } from "@/app/components/MediaCardHorizontal";
import { Container } from "@/components/layout/Container";
import { Media } from "@prisma/client";
import { Button, Empty, Spin, Tooltip } from "antd";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SelectMediaType } from "../SelectMediaType";
import { SelectWatchlistStatus } from "../SelectWatchlistStatus";
import { MediaCardHorizontalLoading } from "@/app/components/MediaCardHorizontal/loading";
import { SortingMedia } from "../SortingMedia";

interface WatchlistProps {
  medias: Media[];
  initialWatchlistCountByYear: MediaByYear[];
  isTabsLoading?: boolean;
}
export const Watchlist = ({
  medias,
  initialWatchlistCountByYear,
  isTabsLoading,
}: WatchlistProps) => {
  const [mediaWatchlist, setMediaWatchlist] = useState<Media[]>(medias);
  const removeMediaFromWatchlist = async (
    mediaType: string,
    mediaID: string
  ) => {
    try {
      await updateWatchlistStatus(mediaID, mediaType, "NOTHING");
      setMediaWatchlist(
        mediaWatchlist.filter(
          (media) =>
            !(media.mediaId === mediaID && media.mediaType === mediaType)
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const [isFilteredLoading, setIsFilteredLoading] = useState(false);
  const [watchlistStatus, setWatchlistStatus] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortBy>("");
  const handleWatchlistStatusChange = async (value: string) => {
    try {
      setIsFilteredLoading(true);
      setWatchlistStatus(value);
      const medias = await getUserWatchList({
        status: value,
        mediaType: mediaType || "",
        sortBy: sorting,
      });
      setMediaWatchlist(medias);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFilteredLoading(false);
    }
  };

  const handleMediaTypeChange = async (value: string) => {
    try {
      setIsFilteredLoading(true);
      setMediaType(value);
      const medias = await getUserWatchList({
        status: watchlistStatus || "",
        mediaType: value,
        sortBy: sorting,
      });
      setMediaWatchlist(medias);
    } catch (error) {
      console.log(error);
    } finally {
      false;
    }
  };
  const handleSortingChange = async (value: string) => {
    try {
      setIsFilteredLoading(true);
      setSorting(value as SortBy);
      const medias = await getUserWatchList({
        status: watchlistStatus || "",
        mediaType: mediaType || "",
        sortBy: value as SortBy,
      });
      setMediaWatchlist(medias);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFilteredLoading(false);
    }
  };

  return (
    <Container className="py-6">
      <h1 className="text-xl font-bold">Watchlist By Year</h1>
      <AreaChartByYear initialRatingCountByYear={initialWatchlistCountByYear} />
      <div className="flex gap-2 justify-between sm:items-center flex-col sm:flex-row">
        <h1 className="text-xl font-bold">My Watchlist</h1>
        <div className="flex items-center gap-2 flex-row">
          <SelectWatchlistStatus onChange={handleWatchlistStatusChange} />
          <SelectMediaType onChange={handleMediaTypeChange} />
          <SortingMedia onChange={handleSortingChange} type="watchlist" />
          <div className="w-px h-8 bg-gray-300" />
          <Link href="/search">
            <Tooltip title="Find new media to watch now !!">
              <Button
                icon={<PlusIcon />}
                type="primary"
                size="middle"
                className="!flex  !font-bold !uppercase !items-center"
              >
                Add
              </Button>
            </Tooltip>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {isTabsLoading || isFilteredLoading ? (
          <>
            <MediaCardHorizontalLoading />
            <MediaCardHorizontalLoading />
            <MediaCardHorizontalLoading />
            <MediaCardHorizontalLoading />
          </>
        ) : mediaWatchlist.length === 0 ? (
          <Empty description="No watchlist yet" className="mt-4" />
        ) : (
          mediaWatchlist.map((media, idx) => (
            <MediaCardHorizontal
              media={media}
              key={media.id}
              removeMedia={removeMediaFromWatchlist}
            />
          ))
        )}
      </div>
    </Container>
  );
};
