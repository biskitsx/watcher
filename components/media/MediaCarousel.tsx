"use client";

import { MediaInfoProps } from "@/wrapper/media-info";
import { Badge, Box, Stack } from "@chakra-ui/react";
import { Carousel, Card, Button } from "antd";
import { RadialProgress } from "./RadialProgress";

interface MediaCarouselProps {
  items: MediaInfoProps[];
}
export const MediaCarousel = ({ items }: MediaCarouselProps) => {
  return (
    <Carousel className="overflow-hidden shadow-md max-h-[60vh]">
      {items?.map((movie: MediaInfoProps, index: number) => {
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
                    <h1 className="text-4xl font-bold">{movie.title}</h1>
                    <Stack direction={"row"}>
                      <RadialProgress value={movie.vote_average * 10} />
                      <Stack direction={"row"} placeItems={"center"}>
                        <Badge>Action</Badge>
                        <Badge>War</Badge>
                        <Badge>drama</Badge>
                      </Stack>
                    </Stack>
                    <Button
                      type="primary"
                      href="/auth/login"
                      className=" tracking-wider w-fit"
                    >
                      MORE INFO
                    </Button>
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
