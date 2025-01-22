"use client";
import { RadialProgress } from "@/components/media/RadialProgress";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { Skeleton } from "antd";

export const MediaDetailLoading = () => {
  return (
    <Box backgroundSize="cover">
      <Box className="bg-[rgba(0,0,0,0.7)]">
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={12}
          className="container py-12"
        >
          <Skeleton.Image
            style={{ width: 250, height: 350 }}
            className="!self-center "
            active
          />
          <Stack
            direction={"column"}
            className="text-white w-full  overflow-x-hidden"
            spacing={4}
          >
            <Heading as="h2" size="2xl">
              <Skeleton.Input
                style={{
                  width: 200,
                  color: "white",
                  backgroundColor: "gray",
                }}
                active
                size="large"
              />
            </Heading>
            <Stack direction={"row"}>
              <div>
                <RadialProgress
                  value={0}
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
                <Skeleton.Input
                  style={{
                    width: 50,
                    color: "white",
                    backgroundColor: "gray",
                  }}
                  active
                  size="small"
                />
                <Skeleton.Input
                  style={{
                    width: 50,
                    color: "white",
                    backgroundColor: "gray",
                  }}
                  active
                  size="small"
                />
              </Stack>
            </Stack>

            <Stack direction={"row"} className="uppercase">
              <Skeleton.Button
                size="large"
                active
                shape="circle"
                style={{ backgroundColor: "gray" }}
              />
              <Skeleton.Button
                size="large"
                active
                shape="circle"
                style={{ backgroundColor: "gray" }}
              />
              <Skeleton.Button
                size="large"
                active
                style={{ backgroundColor: "gray", width: 100 }}
              />
            </Stack>
            <Skeleton.Input
              style={{
                width: "100%",
                height: 200,
                color: "white",
                backgroundColor: "gray",
              }}
              active
              size="large"
            />
            <Text className="text-white text-lg font-semibold ">Cast</Text>
            <Box className="flex gap-4 overflow-x-scroll hide-scrollbar">
              <Box className="flex flex-col gap-2">
                <Skeleton.Image active style={{ width: 100, height: 150 }} />
                <Skeleton.Button active size="small" className="!h-4 !w-full" />
              </Box>
              <Box className="flex flex-col gap-2">
                <Skeleton.Image active style={{ width: 100, height: 150 }} />
                <Skeleton.Button active size="small" className="!h-4 !w-full" />
              </Box>
              <Box className="flex flex-col gap-2">
                <Skeleton.Image active style={{ width: 100, height: 150 }} />
                <Skeleton.Button active size="small" className="!h-4 !w-full" />
              </Box>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};
