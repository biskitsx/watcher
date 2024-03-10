"use server"

import { getTMDb } from "../wrapper/tmdb";

export const getAiringTodaySeries = async (limit: number) => {
    const json = await getTMDb("tv/airing_today?language=en-US&page=1", limit)

    return json as any[]; 
}

// export const getUpcomingMovies = async (limit: number) => {
//     const json = await getTMDb("movie/upcoming?language=en-US&page=1", limit)
//     return json; 
// }




