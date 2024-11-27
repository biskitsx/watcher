import { MediaByYear } from "@/app/api/media/chart/actions";
import { AreaChartByYear } from "@/app/components/AreaChartByYear";
import { MediaCardHorizontal } from "@/app/components/MediaCardHorizontal";
import { Container } from "@/components/layout/Container";
import { Media } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import { Button, Empty, Result } from "antd";
import Link from "next/link";
import { updateMediaRating } from "@/app/api/media/actions";
import { useState } from "react";

interface RatingTabsProps {
  medias: Media[];
  initialRatingCountByYear: MediaByYear[];
}
export const RatingTabs = ({
  medias,
  initialRatingCountByYear,
}: RatingTabsProps) => {
  const [mediaRating, setMediaRating] = useState<Media[]>(medias);
  const removeMediaFromRating = async (mediaType: string, mediaID: string) => {
    try {
      await updateMediaRating(mediaType, mediaID, -1);
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
  return (
    <Container className="py-6">
      <h1 className="text-xl font-bold">Ratings By Year</h1>
      <AreaChartByYear initialRatingCountByYear={initialRatingCountByYear} />
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">My Ratings</h1>
        <Link href="/search">
          <Button
            icon={<PlusIcon />}
            type="primary"
            size="large"
            className="!flex  !font-bold !uppercase !items-center"
          >
            Add
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {mediaRating.length === 0 ? (
          <Empty description="No ratings yet" className="mt-4" />
        ) : (
          mediaRating.map((media, idx) => (
            <MediaCardHorizontal
              media={media}
              key={idx}
              removeMedia={removeMediaFromRating}
            />
          ))
        )}
      </div>
    </Container>
  );
};
