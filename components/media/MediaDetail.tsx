"use client";
import { MediaInfoProps } from "@/wrapper/media-info";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Heading,
  Stack,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  useToast,
} from "@chakra-ui/react";
import { RadialProgress } from "./RadialProgress";
import { palatte } from "@/constant/palatte";
import { formatTheDate } from "@/util/formattedDate";
import { addRateTomedia, toggleWatchList } from "@/app/api/media/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toastConfig } from "../toast/ToastConfig";
import { Status } from "@prisma/client";
import { Image } from "antd";
import { FaBookmark } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { tmdbImagesURL } from "@/data/baseUrl";

interface MediaDetailProps {
  media: MediaInfoProps;
  casts?: any[];
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

  const handleOnSubmit = async () => {
    setIsLoading(true);
    await addRateTomedia(media, rating);
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
    await toggleWatchList(media);
    toast({
      title: "Added to watch list",
      status: "success",
      ...toastConfig,
    });
    router.refresh();
    setIsAddToWatchListLoading(false);
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
              className="text-white w-full"
              spacing={4}
            >
              <Heading as="h2" size="2xl">
                {media.title}{" "}
                <span className="text-[#e5e5e5] text-4xl">
                  {formattedDate && `(${formattedDate.split(" ")[2]})`}
                </span>
              </Heading>
              <Stack direction={"row"}>
                <RadialProgress
                  value={media.vote_average * 10}
                  size="48px"
                  className="text-sm"
                />
                <Stack direction={"row"} placeItems={"center"}>
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
                >
                  <FaBookmark
                    color={
                      media.userMediaData &&
                      media.userMediaData.status !== Status.NOTHING
                        ? palatte.primary
                        : "white"
                    }
                  />
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
              <Text className="text-white text-lg font-semibold">Cast</Text>
              <Box className="flex gap-4">
                {casts?.splice(0, 4).map((cast, index) => (
                  <Box key={index} className="inline-block">
                    <Image
                      src={`${tmdbImagesURL}/${cast.profile_path}`}
                      alt={cast.name}
                      width={100}
                      preview={false}
                    />
                    <Text className="text-white">{cast.name}</Text>
                  </Box>
                ))}
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="">
          <ModalHeader>Rating</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack direction={"column"}>
              <Text>
                What you think about{" "}
                <span className="font-semibold">{media.title}</span>
              </Text>
              <Box className="px-2">
                <Slider
                  defaultValue={rating}
                  min={0}
                  max={10}
                  step={1}
                  size="lg"
                  onChange={(v) => setRating(v)}
                >
                  {scale.map((value, index: number) => (
                    <SliderMark
                      value={value}
                      mt="4"
                      ml="-1.5"
                      fontSize="sm"
                      key={index}
                    >
                      {value}
                    </SliderMark>
                  ))}
                  <SliderTrack bg={"blue.100"} height={4}>
                    <SliderFilledTrack bg={palatte.bgGradient} />
                  </SliderTrack>
                  <SliderThumb boxSize={4} />
                </Slider>
              </Box>
            </Stack>
          </ModalBody>

          <ModalFooter className="space-x-2 mt-4">
            <Button
              bgColor={palatte.darkBlue}
              mr={3}
              onClick={onClose}
              size={"sm"}
              color={"white"}
            >
              CANCLE
            </Button>
            <Button
              size={"sm"}
              color={"white"}
              bgColor={palatte.darkBlue}
              mr={3}
              isLoading={isLoading}
              onClick={handleOnSubmit}
            >
              SUBMIT
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
