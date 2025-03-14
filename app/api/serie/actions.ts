"use server";

import {
  getTMDb,
  getTMDbHelper,
  getTMDbHelperList,
} from "../../../wrapper/tmdb";
import { PaginationProps, SearchProps } from "../media/types";

const SERIES = "serie";

export const getAiringTodaySeries = async ({ page = 1 }: PaginationProps) => {
  return await getTMDbHelperList(
    `tv/airing_today?language=en-US&page=${page}`,
    SERIES
  );
};

export const getOnTheAirSeries = async ({ page = 1 }: PaginationProps) => {
  return await getTMDbHelperList(
    `tv/on_the_air?language=en-US&page=${page}`,
    SERIES
  );
};
export const getPopularSeries = async ({ page = 1 }: PaginationProps) => {
  return await getTMDbHelperList(
    `tv/popular?language=en-US&page=${page}`,
    SERIES
  );
};
export const getTopRatedSeries = async ({ page = 1 }: PaginationProps) => {
  return await getTMDbHelperList(
    `tv/top_rated?language=en-US&page=${page}`,
    SERIES
  );
};

export const getSeriesById = async (id: string) => {
  return await getTMDbHelper(`tv/${id}?language=en-us`, SERIES);
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

export const getSerieRecommendationsFromTMDB = async (id: number) => {
  try {
    const res = await getTMDbHelperList(
      `tv/${id}/recommendations?language=en-US&page=1`,
      SERIES
    );
    return res;
  } catch (error) {
    throw error;
  }
};
