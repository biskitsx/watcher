import { updateMediaStatus } from "@/app/api/media/actions";
import { MediaByYear } from "@/app/api/media/chart/actions";
import { AreaChartByYear } from "@/app/components/AreaChartByYear";
import { MediaCardHorizontal } from "@/app/components/MediaCardHorizontal";
import { Container } from "@/components/layout/Container";
import { Media } from "@prisma/client";
import { Button, Empty } from "antd";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface WatchlistProps {
  medias: Media[];
  initialWatchlistCountByYear: MediaByYear[];
}
export const Watchlist = ({
  medias,
  initialWatchlistCountByYear,
}: WatchlistProps) => {
  const [mediaWatchlist, setMediaWatchlist] = useState<Media[]>(medias);
  const removeMediaFromWatchlist = async (
    mediaType: string,
    mediaID: string
  ) => {
    try {
      await updateMediaStatus(mediaType, mediaID, "NOTHING");
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

  return (
    <Container className="py-6">
      <h1 className="text-xl font-bold">Watchlist By Year</h1>
      <AreaChartByYear initialRatingCountByYear={initialWatchlistCountByYear} />
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">My Watchlist</h1>
        <Link href="/search">
          <Button
            icon={<PlusIcon />}
            type="primary"
            size="middle"
            className="!flex  !font-bold !uppercase !items-center"
          >
            Add
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {mediaWatchlist.length === 0 ? (
          <Empty description="No watchlist yet" className="mt-4" />
        ) : (
          mediaWatchlist.map((media, idx) => (
            <MediaCardHorizontal
              media={media}
              key={idx}
              removeMedia={removeMediaFromWatchlist}
            />
          ))
        )}
      </div>
    </Container>
  );
};
