"use client";
import { searchAnime } from "@/app/api/anime/actions";
import { searchMovie } from "@/app/api/movie/actions";
import { searchSerie } from "@/app/api/serie/actions";
import { BrowseMedia } from "@/app/components/BrowseMedia";
import { Container } from "@/components/layout/Container";
import { PageContainer } from "@/components/layout/PageContainer";
import { MediaCardFlex } from "@/components/media/MediaCardFlex";
import { MediaSlider, MediaSliderProps } from "@/components/media/MediaSlider";
import { MediaInfoProps } from "@/wrapper/media-info";
import { Spin } from "antd";
import { useCallback, useState, useRef, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { debounce } from "lodash";

interface BrowsePageProps {
  mediaType: string;
  initialData: MediaSliderProps[];
}

export const BrowsePage = ({ mediaType, initialData }: BrowsePageProps) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [result, setResult] = useState<MediaInfoProps[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const skeletonArray = Array.from({ length: 10 }, (_, idx) => idx);

  const handleSearch = useCallback(
    async (searchValue = value) => {
      try {
        setSearchLoading(true);
        setPage(1);
        setHasMore(true);

        let res = [] as MediaInfoProps[];
        if (mediaType === "movie") {
          res = await searchMovie({ query: searchValue, page: 1 });
        } else if (mediaType === "anime") {
          res = await searchAnime({ query: searchValue, page: 1 });
        } else if (mediaType === "serie") {
          res = await searchSerie({ query: searchValue, page: 1 });
        }

        setResult(res);
        setPage(2);
        if (res.length === 0) setHasMore(false);
      } catch (error) {
        console.error("Error during search:", error);
      } finally {
        setSearchLoading(false);
      }
    },
    [mediaType, value]
  );

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      let res = [] as MediaInfoProps[];
      if (mediaType === "movie") {
        res = await searchMovie({ query: value, page });
      } else if (mediaType === "anime") {
        res = await searchAnime({ query: value, page });
      } else if (mediaType === "serie") {
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
    } finally {
      setLoading(false);
    }
  }, [value, mediaType, page, loading, hasMore]);

  const debouncedSearch = useRef(
    debounce((searchValue) => {
      handleSearch(searchValue);
    }, 500)
  ).current;

  useEffect(() => {
    if (value) {
      debouncedSearch(value);
    }

    return () => debouncedSearch.cancel();
  }, [value, debouncedSearch, handleSearch]);

  return (
    <PageContainer className="pt-4">
      <Container>
        <BrowseMedia
          mediaType={mediaType}
          setValue={setValue}
          value={value}
          handleSearch={() => {}}
        />
        {value === "" &&
          initialData.map((data, index) => {
            return <MediaSlider key={index} {...data} />;
          })}
        {searchLoading ? (
          <Spin />
        ) : (
          <InfiniteScroll
            dataLength={result.length}
            next={loadMore}
            loader={null}
            hasMore={hasMore}
          >
            <MediaCardFlex medias={result} isLoading={loading} />
          </InfiniteScroll>
        )}
      </Container>
    </PageContainer>
  );
};
