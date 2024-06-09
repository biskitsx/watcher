import { MediaInfoProps } from "@/wrapper/media-info";
import { getTMDb, getTMDbHelper, getTMDbHelperList, tmdbConvertToMediaInfo } from "../wrapper/tmdb";

const MOVIE = "movies";

export const getTrendingAll = async (limit: number) => {
    return await getTMDbHelperList("trending/all/day?language=en-US", limit, MOVIE);
}

export const getUpcomingMovies = async (limit: number) => {
    return await getTMDbHelperList("movie/upcoming?language=en-US&page=1", limit, MOVIE);
}

export const getMovieById = async (id: string) => {
    return await getTMDbHelper(`movie/${id}?language=en-US`, 1, MOVIE);
}



