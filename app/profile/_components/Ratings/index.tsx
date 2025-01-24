import { MediaByYear, getGenreStats } from "@/app/api/media/chart/actions";
import { AreaChartByYear } from "@/app/components/AreaChartByYear";
import { MediaCardHorizontal } from "@/app/components/MediaCardHorizontal";
import { Container } from "@/components/layout/Container";
import { Media } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import { Button, Empty, Tooltip } from "antd";
import Link from "next/link";
import { addRating, getUserRatings, SortBy } from "@/app/api/media/actions";
import { useState } from "react";
import { SelectWatchlistStatus } from "../SelectWatchlistStatus";
import { SelectMediaType } from "../SelectMediaType";
import { MediaCardHorizontalLoading } from "@/app/components/MediaCardHorizontal/loading";
import { SortingMedia } from "../SortingMedia";

interface RatingTabsProps {
  medias: Media[];
  initialRatingCountByYear: MediaByYear[];
  isTabsLoading?: boolean;
}
export const RatingTabs = ({
  medias,
  initialRatingCountByYear,
  isTabsLoading,
}: RatingTabsProps) => {
  const [mediaRating, setMediaRating] = useState<Media[]>(medias);
  const [isFilteredLoading, setIsFilteredLoading] = useState(false);
  const [mediaType, setMediaType] = useState<string | null>(null);
  const [watchlistStatus, setWatchlistStatus] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortBy>("");
  const removeMediaFromRating = async (mediaType: string, mediaID: string) => {
    try {
      await addRating(mediaID, mediaType, -1);
      setMediaRating(
        mediaRating.filter(
          (media) =>
            !(media.mediaId === mediaID && media.mediaType === mediaType)
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleWatchlistStatusChange = async (value: string) => {
    try {
      setIsFilteredLoading(true);
      setWatchlistStatus(value);
      const medias = await getUserRatings({
        status: value,
        mediaType: mediaType || "",
        sortBy: sorting,
      });
      await getGenreStats();
      setMediaRating(medias);
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
      const medias = await getUserRatings({
        status: watchlistStatus || "",
        mediaType: value || "",
        sortBy: sorting,
      });
      setMediaRating(medias);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFilteredLoading(false);
    }
  };

  const handleSortingChange = async (value: string) => {
    try {
      setIsFilteredLoading(true);
      setSorting(value as SortBy);
      const medias = await getUserRatings({
        status: watchlistStatus || "",
        mediaType: mediaType || "",
        sortBy: value as SortBy,
      });
      setMediaRating(medias);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFilteredLoading(false);
    }
  };

  return (
    <Container className="py-6">
      <h1 className="text-xl font-bold">Ratings By Year</h1>
      <AreaChartByYear initialRatingCountByYear={initialRatingCountByYear} />
      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:items-center">
        <h1 className="text-xl font-bold">My Ratings</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex items-center gap-2 flex-row">
            <SelectWatchlistStatus
              onChange={handleWatchlistStatusChange}
              className="w-full"
            />
            <SelectMediaType
              onChange={handleMediaTypeChange}
              className="w-full"
            />
          </div>
          <div className="flex items-center gap-2 flex-row">
            <SortingMedia
              onChange={handleSortingChange}
              type="watchlist"
              className="w-full"
            />
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
      </div>
      <div className="flex flex-col gap-4">
        {isTabsLoading || isFilteredLoading ? (
          <>
            <MediaCardHorizontalLoading />
            <MediaCardHorizontalLoading />
            <MediaCardHorizontalLoading />
            <MediaCardHorizontalLoading />
          </>
        ) : mediaRating.length === 0 ? (
          <Empty description="No ratings yet" className="mt-4" />
        ) : (
          mediaRating.map((media, idx) => (
            <MediaCardHorizontal
              media={media}
              key={media.id}
              removeMedia={removeMediaFromRating}
            />
          ))
        )}
      </div>
    </Container>
  );
};
