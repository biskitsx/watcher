"use server";

import {
  getTMDb,
  getTMDbHelper,
  getTMDbHelperList,
} from "../../../wrapper/tmdb";

const MOVIE = "movie";

export const getTrendingAll = async (limit: number) => {
  return await getTMDbHelperList(
    "trending/all/day?language=en-US",
    limit,
    MOVIE
  );
};

export const getUpcomingMovies = async (limit: number) => {
  return await getTMDbHelperList(
    "movie/upcoming?language=en-US&page=1",
    limit,
    MOVIE
  );
};

export const searchMovie = async (query: string) => {
  return await getTMDbHelperList(`search/movie?query=${query}`, 12, MOVIE);
};

export const getMovieById = async (id: string) => {
  return await getTMDbHelper(`movie/${id}?language=en-US`, 1, MOVIE);
};

export const getCreditsByMovieId = async (id: string) => {
  return await getTMDb(`movie/${id}/credits?language=en-US`, 1);
};
