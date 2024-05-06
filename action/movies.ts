import { MediaInfoProps } from "@/wrapper/media-info";
import { getTMDb, getTMDbHelper, tmdbConvertToMediaInfoList } from "../wrapper/tmdb";

export const getTrendingAll = async (limit: number) => {
    return getTMDbHelper("trending/all/day?language=en-US", limit);
}

export const getUpcomingMovies = async (limit: number) => {
    return getTMDbHelper("movie/upcoming?language=en-US&page=1", limit);
}




