"use client";
import { RadialProgress } from "./RadialProgress";
import { MediaInfoProps } from "@/wrapper/media-info";
import Link from "next/link";
import { formatTheDate } from "@/util/formattedDate";
import { cn } from "@/util/cn";
import { Dropdown, MenuProps } from "antd";
import { FaBookmark, FaEllipsisV, FaHeart, FaStar } from "react-icons/fa";
import { useMemo, useState } from "react";
import {
  addRating,
  toggleFavorite,
  updateWatchlistStatus,
} from "@/app/api/media/actions";
import { toastConfig } from "../toast/ToastConfig";
import { useToast } from "@chakra-ui/react";
import { RatingModal } from "@/app/components/RatingModal";
import { useSession } from "next-auth/react";

interface MediaCardProps {
  media: MediaInfoProps;
  isLong?: boolean;
  size?: "sm" | "md" | "lg";
}

export const MediaCard = ({ media, isLong, size }: MediaCardProps) => {
  const session = useSession();
  const isLogged = session.status === "authenticated";
  const formattedDate = formatTheDate(media.release_date);
  const { favoriteAt, watchListAt, point } = media.userMediaData || {};
  const [isFavorite, setIsFavorite] = useState(favoriteAt ? true : false);
  const [isWatchlist, setIsWatchlist] = useState(watchListAt ? true : false);
  const [rating, setRating] = useState(point ? point : -1);

  const toast = useToast();

  const handleOnFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    try {
      setIsFavorite((prev) => !prev);
      await toggleFavorite(media.id!, media.type);
      toast({
        title: "Favorite has changed successfully",
        status: "success",
        ...toastConfig,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnWatchlist = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    try {
      setIsWatchlist((prev) => !prev);
      const nextStatus = !isWatchlist ? "PLAN_TO_WATCH" : "NOTHING";
      await updateWatchlistStatus(media.id!, media.type, nextStatus);
      toast({
        title: "Watchlist has changed successfully",
        status: "success",
        ...toastConfig,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [isRatingLoading, setIsRatingLoading] = useState(false);
  const onClose = () => setIsRatingModalOpen(false);

  const handleOnRating = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsRatingModalOpen(true);
  };

  const handleOnRatingSubmit = async () => {
    try {
      setIsRatingLoading(true);
      await addRating(media.id!, media.type, rating);
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
  const handleOnClearRating = async () => {
    try {
      setIsRatingLoading(true);
      await addRating(media.id!, media.type, -1);
      setIsRatingLoading(false);
      toast({
        title: "Rating removed successfully!",
        status: "success",
        ...toastConfig,
      });

      setIsRatingModalOpen(false);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const items: MenuProps["items"] = useMemo(() => {
    return [
      {
        label: (
          <div
            className="flex items-center gap-2"
            onClick={(e) => handleOnFavorite(e)}
          >
            <FaHeart className={cn({ "text-red-500": isFavorite })} />
            Favorite
          </div>
        ),
        key: "0",
        disabled: !isLogged,
      },
      {
        label: (
          <div
            className="flex items-center gap-2"
            onClick={(e) => handleOnWatchlist(e)}
          >
            <FaBookmark className={cn({ "text-primary": isWatchlist })} />
            Watchlist
          </div>
        ),
        key: "1",
        disabled: !isLogged,
      },
      {
        label: (
          <div
            className="flex items-center gap-2"
            onClick={(e) => handleOnRating(e)}
          >
            <FaStar className={cn({ "text-yellow-500": rating !== -1 })} />
            Your Rating
          </div>
        ),
        key: "2",
        disabled: !isLogged,
      },
    ];
  }, [isFavorite, isWatchlist, rating]);

  return (
    <div className="">
      <div
        className={cn("rounded-md  inline-block align-top space-y-3", {
          "w-[100px] md:w-[140px] ": !isLong,
          "w-[150px] md:w-[210px]": size === "lg" && !isLong,
          "w-[240px]": isLong,
        })}
      >
        <div className="relative">
          <div className="rounded-md shadow-md overflow-hidden relative">
            <Link href={`/${media.type}/${media.id}`}>
              {/*  eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={isLong ? media.backdrop_path : media.poster_path}
                alt={media.poster_path}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
                }}
                className={cn("hover:scale-105 transition-all object-cover", {
                  "w-[240px] h-[135px]": isLong,
                  "h-[150px] md:h-[210px]": !isLong,
                  "w-[225px] md:w-[315px]": size === "lg" && !isLong,
                })}
              />
            </Link>
          </div>
          <RadialProgress
            value={media.vote_average * 10}
            className="absolute -bottom-4 left-2"
          />
          <div className="absolute right-2 top-2 cursor-default">
            {/* <div className="w-6 h-6 rounded-full opacity-50 bg-white flex items-center justify-center" /> */}
            <Dropdown menu={{ items }} trigger={["click"]}>
              <div className="w-6 h-6 rounded-full opacity-50 bg-white flex items-center justify-center cursor-pointer hover:bg-primary">
                <FaEllipsisV />
              </div>
            </Dropdown>
          </div>
        </div>
        <div className="py-2 px-1">
          <Link
            href={`/${media.type}/${media.id}`}
            // className="!truncate font-semibold"
          >
            <h3 className="truncate font-semibold hover:text-blue-400 transition-all">
              {media.title}
            </h3>
          </Link>
          <p className="truncate italic text-xs font-medium">{formattedDate}</p>
        </div>
      </div>
      <RatingModal
        handleOnSubmit={handleOnRatingSubmit}
        isLoading={isRatingLoading}
        isOpen={isRatingModalOpen}
        title={media.title}
        onClose={onClose}
        rating={rating}
        setRating={setRating}
        handleOnClearRating={handleOnClearRating}
      />
    </div>
  );
};
