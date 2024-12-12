import { MediaByYear, getGenreStats } from "@/app/api/media/chart/actions";
import { AreaChartByYear } from "@/app/components/AreaChartByYear";
import { MediaCardHorizontal } from "@/app/components/MediaCardHorizontal";
import { Container } from "@/components/layout/Container";
import { Media } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import { Button, Empty, Result, Select, Skeleton, Spin, Tooltip } from "antd";
import Link from "next/link";
import { addRating, getUserRatings } from "@/app/api/media/actions";
import { useState } from "react";
import { SelectWatchlistStatus } from "../SelectWatchlistStatus";
import { SelectMediaType } from "../SelectMediaType";

interface RatingTabsProps {
  medias: Media[];
  initialRatingCountByYear: MediaByYear[];
}
export const RatingTabs = ({
  medias,
  initialRatingCountByYear,
}: RatingTabsProps) => {
  const [mediaRating, setMediaRating] = useState<Media[]>(medias);
  const [isFilteredLoading, setIsFilteredLoading] = useState(false);
  const [mediaType, setMediaType] = useState<string | null>(null);
  const [watchlistStatus, setWatchlistStatus] = useState<string | null>(null);
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
        mediaType: value,
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
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">My Ratings</h1>
        <div className="flex items-center gap-2 flex-row">
          <SelectWatchlistStatus onChange={handleWatchlistStatusChange} />
          <SelectMediaType onChange={handleMediaTypeChange} />
          <div className="w-px h-8 bg-gray-300 hidden sm:block" />
          <Link href="/search" className="hidden sm:block">
            <Tooltip title="Find new media to rate now !!!">
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
        {isFilteredLoading ? (
          <div className="flex justify-center items-center h-full">
            <Spin size="large" />
          </div>
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
