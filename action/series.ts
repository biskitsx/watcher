"use server"

import { MediaInfoProps } from "@/wrapper/media-info";
import { getTMDb, tmdbConvertToMediaInfoList } from "../wrapper/tmdb";

export const getAiringTodaySeries = async (limit: number) => {
    const json = await getTMDb("tv/airing_today?language=en-US&page=1", limit)
    const res = tmdbConvertToMediaInfoList(json.results)
    return res as MediaInfoProps[]
}

// export const getUpcomingMovies = async (limit: number) => {
//     const json = await getTMDb("movie/upcoming?language=en-US&page=1", limit)
//     return json; 
// }




