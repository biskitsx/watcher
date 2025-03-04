"use client";
import { RadialProgress } from "./RadialProgress";
import { MediaInfoProps } from "@/wrapper/media-info";
import Link from "next/link";
import { formatTheDate } from "@/util/formattedDate";
import { cn } from "@/util/cn";
import { Dropdown, Image, MenuProps, Tooltip } from "antd";
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

  const getImageSrcByPlatform = (platform: string) => {
    switch (platform) {
      case "imdb":
        return "/platform/imdb.webp";
      case "tmdb":
        return "/platform/tmdb.jpg";
      case "tomatoes":
        return "/platform/tomatoes.png";
      case "mal":
        return "/platform/mal.webp";
      case "anilist":
        return "/platform/anilist.png";
      default:
        return "";
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
  const tmdbMultiPlatformKeys = ["imdb", "tmdb", "tomatoes"];

  const isAnime = media.type === "anime";
  return (
    <div className="">
      <div
        className={cn("rounded-md  inline-block align-top space-y-3", {
          "w-[140px] md:w-[160px] ": !isLong,
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
                  "h-[210px] md:h-[238px]": !isLong,
                  "w-[240px] h-[135px]": isLong,
                })}
              />
            </Link>
          </div>
          <Tooltip title="Average Score">
            <RadialProgress
              value={
                media.multiPlatformRatings?.score_average
                  ? media.multiPlatformRatings.score_average
                  : media.vote_average * 10
              }
              className="absolute -bottom-4 left-2"
            />
          </Tooltip>
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
          <div className="flex gap-4 sm:gap-6 rounded-md ">
            {!!media.multiPlatformRatings
              ? Object.entries(media.multiPlatformRatings).map(
                  ([key, value]) => {
                    if (
                      key === "score_average" ||
                      key === "score" ||
                      key === "metacritic" ||
                      key === "trakt" ||
                      key === "letterboxd"
                    )
                      return null;
                    const isValExist = value > 0;
                    const src = getImageSrcByPlatform(key);
                    return (
                      <Tooltip
                        key={key}
                        title={`${key} Rating`}
                        placement="top"
                        className="!capitalize"
                      >
                        <div className="flex flex-col gap-1 items-center hover:scale-105 transition-all ">
                          <Image
                            src={src}
                            width={30}
                            height={30}
                            preview={false}
                            className="!rounded-md "
                          />
                          <h1 className="font-semibold text-xs">
                            {isValExist ? `${value}%` : "NR"}
                          </h1>
                        </div>
                      </Tooltip>
                    );
                  }
                )
              : tmdbMultiPlatformKeys.map((key) => {
                  const src = getImageSrcByPlatform(key);
                  return (
                    <Tooltip
                      key={key}
                      title={`${key} Rating`}
                      placement="top"
                      className="!capitalize"
                    >
                      <div className="flex flex-col gap-1 items-center hover:scale-105 transition-all ">
                        <Image
                          src={src}
                          width={30}
                          height={30}
                          preview={false}
                          className="!rounded-md"
                        />
                        <h1 className="font-semibold text-xs">NR</h1>
                      </div>
                    </Tooltip>
                  );
                })}
          </div>
          <Link href={`/${media.type}/${media.id}`}>
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
