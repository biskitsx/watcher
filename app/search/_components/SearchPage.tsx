"use client";
import { searchAnime } from "@/app/api/anime/actions";
import { searchMovie } from "@/app/api/movie/actions";
import { searchSerie } from "@/app/api/serie/actions";
import { Container } from "@/components/layout/Container";
import { MediaCardFlex } from "@/components/media/MediaCardFlex";
import { palatte } from "@/constant/palatte";
import { MediaInfoProps } from "@/wrapper/media-info";
import { ConfigProvider, Radio } from "antd";
import Search from "antd/es/input/Search";

import { useCallback, useEffect, useState } from "react";

interface SearchPageProps {
  bannerMedia: MediaInfoProps;
}
export const SearchPage = ({ bannerMedia }: SearchPageProps) => {
  const [value, setValue] = useState("");
  const [type, setType] = useState("movie");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MediaInfoProps[]>([]);

  const handleSearch = async () => {
    setLoading(true);
    if (type === "movie") {
      const res = await searchMovie(value);
      setResult(res);
    } else if (type === "anime") {
      const res = await searchAnime(value);
      setResult(res);
    } else {
      const res = await searchSerie(value);
      setResult(res);
    }
    setLoading(false);
  };

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
            src={bannerMedia.poster_path}
            className="object-cover brightness-50 h-[40vh] w-full"
          />
          <div className="absolute left-1/2 transform -translate-x-1/2 top-3/4 -translate-y-1/2 z-10 text-3xl text-white font-bold">
            Search Result
          </div>
          <Search
            size="large"
            enterButton
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            loading={loading}
            onSearch={async () => await handleSearch()}
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
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <Radio.Button value="movie">Movies</Radio.Button>
            <Radio.Button value="serie">Series</Radio.Button>
            <Radio.Button value="anime">Anime</Radio.Button>
          </Radio.Group>
        </div>
        <Container>
          <MediaCardFlex medias={result} isLoading={loading} />{" "}
        </Container>
      </div>
    </ConfigProvider>
  );
};
