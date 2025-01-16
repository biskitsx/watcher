"use server";

import {
  getTMDb,
  getTMDbHelper,
  getTMDbHelperList,
} from "../../../wrapper/tmdb";
import { PaginationProps, SearchProps } from "../media/types";

const MOVIE = "movie";

export const getTrendingAll = async () => {
  return await getTMDbHelperList("trending/all/day?language=en-US", MOVIE);
};

export const getUpcomingMovies = async ({ page }: PaginationProps) => {
  return await getTMDbHelperList(
    `movie/upcoming?language=en-US&page=${page}`,
    MOVIE
  );
};

export const searchMovie = async ({ query, page = 1 }: SearchProps) => {
  let url = `search/movie?page=${page}&query=${query}`;
  return await getTMDbHelperList(url, MOVIE);
};

export const getMovieById = async (id: string) => {
  return await getTMDbHelper(`movie/${id}?language=en-US`, MOVIE);
};

export const getCreditsByMovieId = async (id: string) => {
  return await getTMDb(`movie/${id}/credits?language=en-US`);
};

export const getNowPlayingMovies = async () => {
  return await getTMDbHelperList(
    "movie/now_playing?language=en-US&page=1'",
    MOVIE
  );
};

export const getPopularMovies = async () => {
  return await getTMDbHelperList("movie/popular?language=en-US&page=1'", MOVIE);
};

export const getTopRatedMovies = async () => {
  return await getTMDbHelperList(
    "movie/top_rated?language=en-US&page=1'",
    MOVIE
  );
};

export const getMovieRecommendationsFromTMDB = async (id: number) => {
  try {
    const res = await getTMDbHelperList(
      `movie/${id}/recommendations?language=en-US&page=1`,
      "movie"
    );
    return res;
  } catch (error) {
    throw error;
  }
};
