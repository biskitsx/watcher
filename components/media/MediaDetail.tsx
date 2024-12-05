"use client";
import { MediaInfoProps } from "@/wrapper/media-info";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Box,
  Heading,
  Stack,
  Text,
  Button,
  useDisclosure,
  useToast,
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
import { Image } from "antd";
import { FaBookmark, FaHeart } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { tmdbImagesURL } from "@/data/baseUrl";
import { CastProps } from "@/app/api/media/types";
import { RatingModal } from "@/app/components/RatingModal";

interface MediaDetailProps {
  media: MediaInfoProps;
  casts?: CastProps[];
}
export const MediaDetail = ({ media, casts }: MediaDetailProps) => {
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
  const [rating, setRating] = useState(5);
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
  const handleOnSubmit = async () => {
    setIsLoading(true);
    await addRating(media.id!, media.type!, rating);
    setIsLoading(false);
    toast({
      title: "Rating changed successfully!",
      status: "success",
      ...toastConfig,
    });
    router.refresh();
    onClose();
  };

  useEffect(() => {
    if (media.userMediaData && media.userMediaData?.point !== -1) {
      setRating(media.userMediaData?.point);
    }
  }, [media]);

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
    return casts
      ?.filter((cast) => cast.profile_path)
      .map((cast, index) => (
        <Box key={index} className="inline-block">
          <Image
            src={`${tmdbImagesURL}/${cast.profile_path}`}
            alt={cast.name}
            width={100}
            height={150}
            preview={false}
          />
          <Text className="text-white text-xs">
            <span className="font-bold">{cast.name}</span> (
            {cast.job ? cast.job : cast.known_for_department})
          </Text>
        </Box>
      ));
  }, [casts]);

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
      onClose();
    } catch (error) {
      console.error(error);
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
  return (
    <>
      <Box
        backgroundImage={media.backdrop_path}
        backgroundPosition="top"
        backgroundSize="cover"
      >
        <Box className="bg-[rgba(0,0,0,0.7)]">
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={12}
            className="container py-12"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={media.poster_path}
              alt={media.poster_path}
              width={300}
              className="self-center"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
              }}
            />
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
                    value={media.vote_average * 10}
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
                  <FaHeart color={isFavorite ? "pink" : "white"} />
                </Button>
                <Button
                  bg={palatte.darkBlue}
                  textColor={"white"}
                  onClick={handleOnOpen}
                >
                  {media.userMediaData && media.userMediaData?.point !== -1
                    ? `Your vibe: ${media.userMediaData?.point}/10`
                    : "What's your vibe"}
                </Button>
              </Stack>
              <Text textColor={"white"}>
                {media.overview
                  ? media.overview
                  : "We don't have an overview translated in English."}
              </Text>
              <Text className="text-white text-lg font-semibold ">Cast</Text>
              <Box className="flex gap-4 overflow-x-scroll hide-scrollbar">
                {castsElement}
              </Box>
            </Stack>
          </Stack>
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
    </>
  );
};
