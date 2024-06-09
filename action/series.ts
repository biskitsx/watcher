"use server"

import { MediaInfoProps } from "@/wrapper/media-info";
import { getTMDb, tmdbConvertToMediaInfo, tmdbConvertToMediaInfoList } from "../wrapper/tmdb";

const SERIES = "series";

export const getAiringTodaySeries = async (limit: number) => {
    const json = await getTMDb("tv/airing_today?language=en-US&page=1", limit)
    const res = tmdbConvertToMediaInfoList(json.results, SERIES)
    return res as MediaInfoProps[]
}


export const getSeriesById = async (id: string) => {
    const json = await getTMDb(`tv/${id}?language=en-US`, 1);
    return tmdbConvertToMediaInfo(json, SERIES);
}




// export const getUpcomingMovies = async (limit: number) => {
//     const json = await getTMDb("movie/upcoming?language=en-US&page=1", limit)
//     return json; 
// }




