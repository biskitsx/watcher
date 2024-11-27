"use client";
import { MediaInfoProps } from "@/wrapper/media-info";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { MediaCard } from "../media/MediaCard";
import { PaginationProps } from "@/app/api/media/types";

interface InfiniteMediaProps {
  fetchData: ({ page }: PaginationProps) => Promise<MediaInfoProps[]>;
  initialData: MediaInfoProps[];
  title?: string;
}
export const InfiniteMedia = ({
  fetchData,
  initialData,
  title,
}: InfiniteMediaProps) => {
  const [medias, setMedias] = useState<MediaInfoProps[]>(initialData);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);

  const loadMore = async () => {
    const res = await fetchData({ page });
    if (res.length === 0) {
      setHasMore(false);
    } else {
      setMedias((prev) => [...prev, ...res]);
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 items-center">
        <div className="bg-secondary h-6 w-[5px] " />

        {title && <h1 className="font-bold text-2xl">{title}</h1>}
      </div>
      <InfiniteScroll
        dataLength={medias.length}
        hasMore={hasMore}
        next={loadMore}
        loader={<h1>loading</h1>}
        // style={{ height: 1000 }}
      >
        <div className="flex flex-wrap justify-between gap-4">
          {medias.map((media, idx) => (
            <MediaCard media={media} key={idx} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};
