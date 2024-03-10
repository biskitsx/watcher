"use server"

import { MediaInfoProps } from "@/wrapper/handled";
import { getTMDb } from "../wrapper/tmdb";

export const getAiringTodaySeries = async (limit: number) => {
    const res = await getTMDb("tv/airing_today?language=en-US&page=1", limit)
    return res as MediaInfoProps[]

}

// export const getUpcomingMovies = async (limit: number) => {
//     const json = await getTMDb("movie/upcoming?language=en-US&page=1", limit)
//     return json; 
// }




