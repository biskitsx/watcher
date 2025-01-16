"use client";

import { MediaInfoProps } from "@/wrapper/media-info";
import { Badge, Box, Stack, Text } from "@chakra-ui/react";
import { Carousel } from "antd";
import { RadialProgress } from "./RadialProgress";
import { MediaCard } from "./MediaCard";
import { Container } from "../layout/Container";
import Link from "next/link";
import { MotionFaded } from "../motion/MotionFaded";

interface MediaCarouselProps {
  items: MediaInfoProps[];
}
export const MediaCarousel = ({ items }: MediaCarouselProps) => {
  return (
    <Carousel className="overflow-hidden shadow-md max-h-[60vh]">
      {items?.slice(0, 5).map((movie: MediaInfoProps, index: number) => {
        if (movie.backdrop_path) {
          return (
            <Box key={index} className="relative">
              <Box
                backgroundImage={movie.backdrop_path}
                backgroundPosition="top"
                backgroundSize="cover"
                key={index}
                height={"60vh"}
                // className="brightness-50"
              />
              <Box className="absolute w-full h-full top-1/2 left-0 px-[10px] md:px-20 lg:px-40 ">
                <Container>
                  <MotionFaded className="rounded-md overflow-hidden bg-[rgba(0,0,0,0.6)] text-white flex flex-row gap-4">
                    <div className="w-[6px] bg-secondary" />
                    <div className="space-y-2 p-2">
                      <Link
                        href={`/${movie.type}/${movie.id}`}
                        className="text-3xl uppercase font-extrabold"
                      >
                        {movie.title}
                      </Link>
                      <p className="italic line-clamp-2 text-white">
                        {movie.overview}
                      </p>
                    </div>
                  </MotionFaded>
                </Container>
                {/* <Box className="h-full flex flex-row gap-4 w-full p-8">
                  <img
                    src={movie.poster_path}
                    alt={movie.poster_path}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
                    }}
                    className="hover:scale-105 transition-all object-cover w-[240px] "
                  />
                  <Box>
                    <Text
                      fontSize="2xl"
                      fontWeight="bold"
                      className="mt-2"
                      color="white"
                    >
                      {movie.title}
                    </Text>
                    <Stack direction="row" className="mt-2">
                      <Badge colorScheme="red">{movie.vote_average}</Badge>
                    </Stack>
                    <Text color="white" className="mt-2">
                      {movie.overview}
                    </Text>
                  </Box>
                </Box> */}
              </Box>
            </Box>
          );
        }
      })}
    </Carousel>
  );
};
