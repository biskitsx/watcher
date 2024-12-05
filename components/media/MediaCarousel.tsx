"use client";

import { MediaInfoProps } from "@/wrapper/media-info";
import { Badge, Box, Stack, Text } from "@chakra-ui/react";
import { Carousel, Button } from "antd";
import { RadialProgress } from "./RadialProgress";

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
                className="brightness-50"
              />
              <Box className="absolute w-full h-full top-0 left-0 px-[10px] md:px-20 lg:px-40 pt-20">
                <Box className="h-full w-full p-8">
                  <Stack
                    direction={"column"}
                    className="text-white"
                    spacing={10}
                  >
                    <h1 className="text-4xl font-semibold">{movie.title}</h1>
                    <Stack direction={"row"}>
                      <RadialProgress
                        value={movie.vote_average * 10}
                        size="48px"
                        className="text-sm"
                      />
                      <Stack direction={"row"} placeItems={"center"}>
                        <Stack direction={"row"} placeItems={"center"}>
                          {movie.genres &&
                            movie.genres.map((genre, index) => (
                              <Badge key={index} size="lg">
                                {genre.name}
                              </Badge>
                            ))}
                        </Stack>
                      </Stack>
                    </Stack>
                    <Text className="text-sm text-white line-clamp-4 font-medium">
                      {movie.overview}
                    </Text>
                    {/* <Button type="primary" className=" tracking-wider w-fit">
                      MORE INFO
                    </Button> */}
                  </Stack>
                </Box>
              </Box>
            </Box>
          );
        }
      })}
    </Carousel>
  );
};
