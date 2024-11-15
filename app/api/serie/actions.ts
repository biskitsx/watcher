"use server";

import { MediaInfoProps } from "@/wrapper/media-info";
import {
  getTMDb,
  getTMDbHelper,
  getTMDbHelperList,
  tmdbConvertToMediaInfoList,
} from "../../../wrapper/tmdb";
import { PaginationProps, SearchProps } from "../media/types";

const SERIES = "serie";

export const getAiringTodaySeries = async ({ page = 1 }: PaginationProps) => {
  const json = await getTMDb(`tv/airing_today?language=en-US&page=${page}`);
  const res = tmdbConvertToMediaInfoList(json.results, SERIES);
  return res as MediaInfoProps[];
};

export const getSeriesById = async (id: string) => {
  return await getTMDbHelper(`tv/${id}?language=en-US`, SERIES);
};

export const getTrendingSeries = async ({ page = 1 }: PaginationProps) => {
  return await getTMDbHelperList(
    `trending/tv/day?language=en-US&page=${page}`,
    SERIES
  );
};

export const searchSerie = async ({ query, page }: SearchProps) => {
  return await getTMDbHelperList(
    `search/tv?query=${query}&page=${page}`,
    SERIES
  );
};

export const getCreditsBySerieId = async (id: string) => {
  return await getTMDb(`tv/${id}/credits?language=en-US`);
};
