"use client";
import { searchAnime } from "@/app/api/anime/actions";
import { searchMovie } from "@/app/api/movie/actions";
import { searchSerie } from "@/app/api/serie/actions";
import { Container } from "@/components/layout/Container";
import { MediaCardFlex } from "@/components/media/MediaCardFlex";
import { palatte } from "@/constant/palatte";
import { MediaInfoProps } from "@/wrapper/media-info";
import { ConfigProvider, Radio, Skeleton } from "antd";
import Search from "antd/es/input/Search";
import InfiniteScroll from "react-infinite-scroll-component";

import { useCallback, useEffect, useState } from "react";
import SkeletonImage from "antd/es/skeleton/Image";

interface SearchPageProps {
  bannerMedia: MediaInfoProps;
}

export const SearchPage = ({ bannerMedia }: SearchPageProps) => {
  const [value, setValue] = useState("");
  const [type, setType] = useState("movie");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MediaInfoProps[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const skeletonArray = Array.from({ length: 10 }, (_, idx) => idx);
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      let res = [] as MediaInfoProps[];
      if (type === "movie") {
        res = await searchMovie({ query: value, page });
      } else if (type === "anime") {
        res = await searchAnime({ query: value, page });
      } else if (type === "serie") {
        res = await searchSerie({ query: value, page });
      }
      if (res.length === 0) {
        setHasMore(false);
      } else {
        setResult((prev) => [...prev, ...res]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error loading more data:", error);
    }
    setLoading(false);
  }, [value, type, page, loading, hasMore]);

  const handleSearch = useCallback(async () => {
    setLoading(true);
    try {
      setPage(1);
      setHasMore(true);
      let res = [] as MediaInfoProps[];
      if (type === "movie") {
        res = await searchMovie({ query: value, page: 1 });
      } else if (type === "anime") {
        res = await searchAnime({ query: value, page: 1 });
      } else if (type === "serie") {
        res = await searchSerie({ query: value, page: 1 });
      }
      setResult(res);
      setPage(2);
      if (res.length === 0) setHasMore(false);
    } catch (error) {
      setLoading(false);
      console.error("Error during search:", error);
    }
    setLoading(false);
  }, [value, type]);

  useEffect(() => {
    handleSearch();
  }, [type]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: palatte.secondary,
        },
      }}
    >
      <div className="flex flex-col gap-4">
        <div className="relative mb-5">
          <img
            src={bannerMedia.backdrop_path}
            className="object-cover brightness-50 h-[40vh] w-full"
          />
          <div className="absolute left-1/2 transform -translate-x-1/2 top-3/4 -translate-y-1/2 z-10 text-3xl text-white font-bold text-center">
            Find Your Favorite Media !
          </div>
          <Search
            size="large"
            enterButton
            value={value}
            onChange={(e) => setValue(e.target.value)}
            loading={loading}
            onSearch={handleSearch}
            style={{ width: "50%" }}
            className="absolute -bottom-5 left-1/2 transform -translate-x-1/2"
          />
        </div>
        <div className="flex items-center justify-center">
          <Radio.Group
            defaultValue={type}
            buttonStyle="solid"
            size="large"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <Radio.Button value="movie">Movies</Radio.Button>
            <Radio.Button value="serie">Series</Radio.Button>
            <Radio.Button value="anime">Anime</Radio.Button>
          </Radio.Group>
        </div>
        <Container>
          <InfiniteScroll
            dataLength={result.length}
            next={loadMore}
            loader={
              <div className="flex flex-wrap gap-6">
                {skeletonArray.map((idx) => (
                  <SkeletonImage
                    key={idx}
                    active
                    style={{ height: 210, width: 140 }}
                  />
                ))}
              </div>
            }
            hasMore={hasMore}
          >
            <MediaCardFlex medias={result} isLoading={loading} />
          </InfiniteScroll>
        </Container>
      </div>
    </ConfigProvider>
  );
};
