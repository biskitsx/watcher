"use client";
import { MediaInfoProps } from "@/wrapper/media-info";
import { useMemo, useState } from "react";
import {
  Badge,
  Box,
  Heading,
  Stack,
  Text,
  Button,
  useDisclosure,
  useToast,
  Progress,
} from "@chakra-ui/react";
import { RadialProgress } from "./RadialProgress";
import { palatte } from "@/constant/palatte";
import { formatTheDate } from "@/util/formattedDate";
import {
  addRating,
  toggleFavorite,
  updateWatchlistStatus,
} from "@/app/api/media/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toastConfig } from "../toast/ToastConfig";
import { Status } from "@prisma/client";
import { Image, Tooltip } from "antd";
import { FaBookmark, FaHeart } from "react-icons/fa";
import { tmdbImagesURL } from "@/data/baseUrl";
import { CastProps, Character } from "@/app/api/media/types";
import { RatingModal } from "@/app/components/RatingModal";
import { MotionFaded } from "../motion/MotionFaded";
import { CreateReviewModal } from "@/app/components/CreateReviewModal";
import { ReviewModal } from "@/app/components/ReviewsModal";
import { WatchProvider } from "@/app/watch_providers/types";

interface MediaDetailProps {
  media: MediaInfoProps;
  casts?: CastProps[];
  aniemeCasts?: Character[];
  providers?: WatchProvider[];
}
export const MediaDetail = ({
  media,
  casts,
  aniemeCasts,
  providers,
}: MediaDetailProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const session = useSession();
  const handleOnOpen = () => {
    if (!session.data) {
      return router.push("/auth/login");
    }
    onOpen();
  };
  const toast = useToast();

  const [isRated, setIsRated] = useState(!!media.userMediaData?.ratedAt);
  const [rating, setRating] = useState(media.userMediaData?.point || 1);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddToWatchListLoading, setIsAddToWatchListLoading] = useState(false);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(
    media.userMediaData?.favoriteAt ? true : false
  );
  const scale = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const ratingDescription = [
    "Dumpster Fire",
    "Absolute Trash",
    "Garbage",
    "Truly Bad",
    "Not Good",
    "Passable",
    "It's Alright",
    "Pretty Decent",
    "Really Good",
    "Greatness",
    "Champions",
  ];
  const formattedDate = formatTheDate(media.release_date);
  const [watchList, setWatchList] = useState(
    media.userMediaData?.status &&
      media.userMediaData?.status !== Status.NOTHING
  );
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const handleOnSubmit = async () => {
    setIsLoading(true);
    await addRating(media.id!, media.type!, rating);
    setRating(rating);
    setIsLoading(false);
    toast({
      title: "Rating changed successfully!",
      status: "success",
      ...toastConfig,
    });
    setIsRated(true);
    onClose();
  };

  const handleAddToWatchList = async () => {
    if (!session.data) {
      return router.push("/auth/login");
    }
    setIsAddToWatchListLoading(true);
    const newStatus = watchList ? Status.NOTHING : Status.PLAN_TO_WATCH;
    await updateWatchlistStatus(media.id!, media.type!, newStatus);
    toast({
      title: "Added to watch list",
      status: "success",
      ...toastConfig,
    });
    setWatchList(!watchList);
    setIsAddToWatchListLoading(false);
  };

  const castsElement = useMemo(() => {
    if (casts) {
      return casts
        ?.filter((cast) => cast.profile_path)
        .map((cast, index) => (
          <Box key={index} className="inline-block w-[100px]">
            <Image
              src={`${tmdbImagesURL}/${cast.profile_path}`}
              alt={cast.name}
              width={100}
              height={150}
              preview={false}
            />
            <Text className="text-white text-xs !text-wrap">
              <span className="font-bold text-wrap">{cast.name}</span> (
              {cast.job ? cast.job : cast.known_for_department})
            </Text>
          </Box>
        ));
    }
    if (aniemeCasts) {
      return aniemeCasts?.map((cast, index) => (
        <Box key={index} className="inline-block w-[100px]">
          <Image
            src={`${cast.image}`}
            alt={cast.name}
            width={100}
            height={150}
            preview={false}
          />
          <Text className="text-white text-xs text-wrap">
            <span className="font-bold text-wrap">{cast.name}</span>
          </Text>
        </Box>
      ));
    }
    return [];
  }, [casts, aniemeCasts]);

  const handleOnClearRating = async () => {
    try {
      setIsAddToWatchListLoading(true);
      await addRating(media.id!, media.type!, -1);
      setIsAddToWatchListLoading(false);
      toast({
        title: "Rating changed successfully!",
        status: "success",
        ...toastConfig,
      });
      setRating(-1);
      setIsRated(false);
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

  const handleOnFavorite = async () => {
    try {
      setIsFavoriteLoading(true);
      await toggleFavorite(media.id!, media.type!);
      toast({
        title: "Added to favorite",
        status: "success",
        ...toastConfig,
      });
      setIsFavorite((prev) => !prev);
      setIsFavoriteLoading(false);
    } catch (error) {
      toast({
        title: "Failed to favorite",
        status: "error",
        ...toastConfig,
      });
    } finally {
      setIsFavoriteLoading(false);
    }
  };

  const [isCreateReviewModalOpen, setIsCreateReviewModalOpen] = useState(false);
  return (
    <>
      <Box
        backgroundImage={media.backdrop_path}
        backgroundPosition="top"
        backgroundSize="cover"
      >
        <Box className="bg-[rgba(0,0,0,0.7)]">
          <MotionFaded>
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={12}
              className="container py-12"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div className="w-full md:w-[300px] flex items-center justify-center flex-col">
                <img
                  src={media.poster_path}
                  alt={media.poster_path}
                  width={300}
                  className="self-center hover:scale-105 transition-all object-cover w-[240px]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
                  }}
                />
                {providers && providers?.length != 0 && (
                  <div className="p-4 gap-2 flex flex-col items-center justify-center">
                    {/* <Text className="text-white text-lg font-semibold ">
                      Watch Providers
                    </Text> */}
                    <Box className="flex gap-3 justify-center w-full">
                      {providers.map((provider, index) => (
                        <Tooltip title={provider.provider_name} key={index}>
                          <Image
                            className="!rounded-md !overflow-hidden"
                            key={index}
                            src={`${tmdbImagesURL}${provider.logo_path}`}
                            width={35}
                            height={35}
                            preview={false}
                          />
                        </Tooltip>
                      ))}
                    </Box>
                    <h1 className="text-white font-medium text-sm">
                      Now Streaming
                    </h1>
                  </div>
                )}
              </div>
              {/* <Progress value={80} /> */}
              <Stack
                direction={"column"}
                className="text-white w-full  overflow-x-hidden"
                spacing={4}
              >
                <Heading as="h2" size="2xl">
                  {media.title}{" "}
                  <span className="text-[#e5e5e5] text-4xl">
                    {formattedDate && `(${formattedDate.split(" ")[2]})`}
                  </span>
                </Heading>
                <Stack direction={"row"}>
                  <div>
                    <RadialProgress
                      value={
                        media.multiPlatformRatings?.score
                          ? media.multiPlatformRatings.score
                          : media.vote_average * 10
                      }
                      size="48px"
                      thickness="3px"
                      className="text-sm"
                    />
                  </div>
                  <Stack
                    direction={"row"}
                    placeItems={"center"}
                    className="!overflow-x-scroll hide-scrollbar"
                  >
                    {media.genres &&
                      media.genres.map((genre, index) => (
                        <Badge key={index}>{genre.name}</Badge>
                      ))}
                  </Stack>
                </Stack>
                <div className="flex gap-6  rounded-md p-1 ">
                  {!!media.multiPlatformRatings &&
                    Object.entries(media.multiPlatformRatings).map(
                      ([key, value]) => {
                        if (key === "score") return null;
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
                              />
                              <h1 className="font-semibold text-xs">
                                {isValExist ? `${value}%` : "NR"}
                              </h1>
                            </div>
                          </Tooltip>
                        );
                      }
                    )}
                </div>
                <Stack direction={"row"} className="uppercase">
                  <Button
                    bgColor={palatte.darkBlue}
                    onClick={handleAddToWatchList}
                    isLoading={isAddToWatchListLoading}
                    rounded={"full"}
                    height={"40px"}
                    width={"40px"}
                    padding={0}
                  >
                    <FaBookmark color={watchList ? palatte.primary : "white"} />
                  </Button>
                  <Button
                    bgColor={palatte.darkBlue}
                    onClick={handleOnFavorite}
                    isLoading={isFavoriteLoading}
                    rounded={"full"}
                    height={"40px"}
                    width={"40px"}
                    padding={0}
                  >
                    <FaHeart
                      // color={isFavorite ? "#dfdfe3" : "white"}
                      fill={isFavorite ? "violet" : "white"}
                    />
                  </Button>
                  <Button
                    bg={palatte.darkBlue}
                    textColor={"white"}
                    onClick={handleOnOpen}
                  >
                    {isRated ? `Your vibe: ${rating}/10` : "What's your vibe ?"}
                  </Button>
                  <Button
                    bg={palatte.darkBlue}
                    textColor={"white"}
                    onClick={() => setIsReviewsModalOpen(true)}
                  >
                    Reviews
                  </Button>
                </Stack>
                <Text textColor={"white"}>
                  {media.overview
                    ? media.overview
                    : "We don't have an overview translated in English."}
                </Text>
                {!!castsElement.length && (
                  <>
                    <Text className="text-white text-lg font-semibold ">
                      Cast
                    </Text>
                    <Box className="flex gap-4 overflow-x-scroll hide-scrollbar">
                      {castsElement}
                    </Box>
                  </>
                )}{" "}
              </Stack>
            </Stack>
          </MotionFaded>
        </Box>
      </Box>
      {isOpen && (
        <RatingModal
          handleOnSubmit={handleOnSubmit}
          isOpen={isOpen}
          onClose={onClose}
          rating={rating}
          setRating={setRating}
          title={media.title}
          isLoading={isLoading}
          handleOnClearRating={handleOnClearRating}
        />
      )}
      {isCreateReviewModalOpen && (
        <CreateReviewModal
          isOpen={isCreateReviewModalOpen}
          onClose={() => setIsCreateReviewModalOpen(false)}
          media={media}
        />
      )}
      {isReviewsModalOpen && (
        <ReviewModal
          isOpen={isReviewsModalOpen}
          onClose={() => {
            setIsReviewsModalOpen(false);
          }}
          media={media}
          openCreateReviewModal={() => {
            setIsReviewsModalOpen(false);
            setIsCreateReviewModalOpen(true);
          }}
        />
      )}
    </>
  );
};
