"use server";

import {
  getTMDb,
  getTMDbHelper,
  getTMDbHelperList,
} from "../../../wrapper/tmdb";
import { CastProps, PaginationProps, SearchProps } from "../media/types";

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
