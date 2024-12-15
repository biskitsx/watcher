import {
  addRating,
  onUpdateWatchedEpisodes,
  toggleFavorite,
  updateWatchlistStatus,
} from "@/app/api/media/actions";
import { RadialProgress } from "@/components/media/RadialProgress";
import { palatte } from "@/constant/palatte";
import { formatTheDate } from "@/util/formattedDate";
import { useToast } from "@chakra-ui/react";
import { Media, Status } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaBookmark, FaHeart, FaPlus, FaStar } from "react-icons/fa";
import { toastConfig } from "@/components/toast/ToastConfig";
import { RatingModal } from "../RatingModal";
import { Badge, InputNumber, Select } from "antd";
import { IoIosClose } from "react-icons/io";
import { debounce } from "lodash";
interface MediaCardHorizontalProps {
  media: Media;
  removeMedia: (mediaType: string, mediaID: string) => void;
  isLoading?: boolean;
}
export const MediaCardHorizontal = ({
  media,
  removeMedia,
}: MediaCardHorizontalProps) => {
  const [watchlistStatus, setWatchlistStatus] = useState<Status>(media.status);
  const [isFavorite, setIsFavorite] = useState(media.favoriteAt ? true : false);
  const date = formatTheDate(
    media.mediaReleaseDate ? media.mediaReleaseDate : ""
  );
  const href = media.mediaType + "/" + media.mediaId;
  const [rating, setRating] = useState(media.point);
  const toast = useToast();
  const [isAddToWatchListLoading, setIsAddToWatchListLoading] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [isRatingLoading, setIsRatingLoading] = useState(false);
  const [watchedEpisode, setWatchedEpisode] = useState(
    media.watchedEpisodes ? media.watchedEpisodes : 0
  );

  const handleAddToWatchList = async () => {
    setIsAddToWatchListLoading(true);
    try {
      const newStatus =
        watchlistStatus === Status.NOTHING
          ? Status.PLAN_TO_WATCH
          : Status.NOTHING;
      await updateWatchlistStatus(media.mediaId, media.mediaType, newStatus);
      setWatchlistStatus(newStatus);
      if (watchlistStatus !== Status.NOTHING) {
        setWatchlistStatus(Status.NOTHING);
        toast({
          title: "Removed from watch list",
          status: "success",
          ...toastConfig,
        });
      } else {
        setWatchlistStatus(Status.PLAN_TO_WATCH);
        toast({
          title: "Added to watch list",
          status: "success",
          ...toastConfig,
        });
      }
    } catch (error) {
      console.error(error);
    }
    setIsAddToWatchListLoading(false);
  };

  const isRating = useMemo(() => {
    if (rating >= 0) {
      return true;
    }
    return false;
  }, [rating]);

  const onClose = () => {
    setIsRatingModalOpen(false);
  };
  const handleOnClearRating = async () => {
    try {
      setIsAddToWatchListLoading(true);
      await addRating(media.mediaId, media.mediaType, -1);
      setIsAddToWatchListLoading(false);
      toast({
        title: "Rating changed successfully!",
        status: "success",
        ...toastConfig,
      });
      setRating(-1);
      setIsRatingModalOpen(false);

      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  const handleOnSubmit = async () => {
    try {
      setIsRatingLoading(true);
      await addRating(media.mediaId, media.mediaType, rating);
      setIsRatingLoading(false);
      toast({
        title: "Rating changed successfully!",
        status: "success",
        ...toastConfig,
      });

      setIsRatingModalOpen(false);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnRemove = async () => {
    try {
      await removeMedia(media.mediaType, media.mediaId);
      toast({
        title: "Removed from your list",
        status: "success",
        ...toastConfig,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectStatusChange = async (value: Status) => {
    setWatchlistStatus(value);
    await updateWatchlistStatus(media.mediaId, media.mediaType, value);
    toast({
      title: "Status has changed successfully",
      status: "success",
      ...toastConfig,
    });
  };

  const handleOnFavorite = async () => {
    try {
      setIsFavorite(!isFavorite);
      await toggleFavorite(media.mediaId, media.mediaType);
      toast({
        title: "Favorite has changed successfully",
        status: "success",
        ...toastConfig,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnInputChange = async (value: number | null) => {
    try {
      if (value === null) {
        throw new Error("Value is not valid");
      }
      setWatchedEpisode(value);
      await handleOnUpdateEpisode(value);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnAddEpisode = async () => {
    try {
      let val = 0;

      if (!media.episodes) {
        throw new Error("Episode count is not available");
      }
      if (watchedEpisode < media.episodes) {
        val = watchedEpisode + 1;
      }
      setWatchedEpisode(val);
      await handleOnUpdateEpisode(val);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnUpdateEpisode = useMemo(
    () =>
      debounce(async (value: number) => {
        try {
          await onUpdateWatchedEpisodes(media.id, value);
          toast({
            title: "Episode has changed successfully",
            status: "success",
            ...toastConfig,
          });
        } catch (error) {
          console.error(error);
        }
      }, 500),
    [media.id, toast]
  );

  // clean up
  useEffect(() => {
    return () => {
      handleOnUpdateEpisode.cancel();
    };
  }, [handleOnUpdateEpisode]);

  let color = "";

  if (media.mediaType === "movie") {
    color = palatte.secondary;
  } else if (media.mediaType === "serie") {
    color = palatte.primary;
  } else if (media.mediaType === "anime") {
    color = palatte.tertiary;
  }
  return (
    <Badge.Ribbon
      text={media.mediaType}
      color={color}
      className="capitalize !font-semibold"
    >
      <div className="flex rounded-md shadow-md border overflow-hidden transition-all duration-300 ">
        <aside className="">
          <img
            src={media.mediaPoster}
            alt={media.mediaPoster}
            className="w-48"
          />
        </aside>
        <main className="w-full p-4  overflow-x-scroll hide-scrollbar flex flex-col justify-between gap-4">
          <div className="flex  items-center gap-2">
            <div>
              <RadialProgress
                value={media.mediaVoteAverage ? media.mediaVoteAverage * 10 : 0}
                className="text-xs"
                size="38px"
                // thickness="3px"
              />
            </div>
            <div>
              <Link className="sm:text-lg font-bold text-nowrap" href={href}>
                {media.mediaTitle}
              </Link>
              <p className="">{date}</p>
            </div>
          </div>
          <div>
            <p className="line-clamp-1 sm:line-clamp-3 text-black">
              {media.mediaOverview}
            </p>
          </div>
          <div className="flex gap-3 text-gray-500">
            <div className="flex items-center gap-1">
              <div>
                <div
                  className={clsx(
                    "border rounded-full size-8 grid place-items-center font-semibold text-sm text-gray-500 cursor-pointer",
                    { "bg-blue-400 border-none text-white ": isRating }
                  )}
                  onClick={() => setIsRatingModalOpen(true)}
                >
                  {isRating ? rating * 10 : <FaStar />}
                </div>
              </div>
              <h5 className="text-nowrap">
                {isRating ? "Your Rating" : "Rate it!"}
              </h5>
            </div>

            <div className="flex items-center gap-2">
              <div
                className={clsx(
                  "rounded-full size-8 grid place-items-center font-semibold text-sm border cursor-pointer",
                  {
                    "bg-primary border-none":
                      watchlistStatus !== Status.NOTHING,
                    "cursor-progress": isAddToWatchListLoading,
                  }
                )}
                onClick={handleAddToWatchList}
              >
                <FaBookmark
                  color={watchlistStatus !== Status.NOTHING ? "white" : "gray"}
                />
              </div>
              {watchlistStatus === Status.NOTHING && (
                <h5 className="mr-[65px]">Watchlist</h5>
              )}
              {watchlistStatus !== Status.NOTHING && (
                <Select
                  size="small"
                  defaultValue={watchlistStatus}
                  onChange={handleSelectStatusChange}
                  style={{ width: 130 }}
                  options={[
                    { value: Status.PLAN_TO_WATCH, label: "Plan to watch" },
                    { value: Status.WATCHING, label: "Watching" },
                    { value: Status.DROPPED, label: "Dropped" },
                    { value: Status.WATCHED, label: "Watched" },
                  ]}
                />
              )}
            </div>
            <div className="flex items-center gap-1 w-32">
              <div
                className={clsx(
                  "rounded-full size-8 grid place-items-center font-semibold text-sm border cursor-pointer",
                  { "bg-pink-500 border-none": isFavorite }
                )}
                onClick={handleOnFavorite}
              >
                <FaHeart color={!!isFavorite ? "white" : "gray"} />
              </div>
              <h5>Favorite</h5>
            </div>
            {!!media.episodes && (
              <div className="flex items-center gap-1">
                <div
                  className="rounded-full size-8 grid place-items-center font-semibold text-sm border cursor-pointer bg-green-600"
                  onClick={handleOnAddEpisode}
                >
                  <FaPlus color={"white"} />
                </div>
                <InputNumber
                  max={media.episodes}
                  min={0}
                  className="!w-12"
                  controls={false}
                  value={watchedEpisode}
                  onChange={handleOnInputChange}
                />
                /{media.episodes}
                <h5>Episode</h5>
              </div>
            )}
            <div className="flex items-center gap-1 w-32">
              <div
                className="rounded-full size-8 grid place-items-center font-semibold text-sm border cursor-pointer"
                onClick={handleOnRemove}
              >
                <IoIosClose size={28} />
              </div>
              <h5>Remove</h5>
            </div>
          </div>
        </main>
        <RatingModal
          handleOnSubmit={handleOnSubmit}
          isLoading={isRatingLoading}
          isOpen={isRatingModalOpen}
          title={media.mediaTitle}
          onClose={onClose}
          rating={rating}
          setRating={setRating}
          handleOnClearRating={handleOnClearRating}
        />
      </div>
    </Badge.Ribbon>
  );
};
