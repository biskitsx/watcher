"use server"

import { getTMDb } from "../wrapper/tmdb";

export const getTrendingAll = async (limit: number) => {
    const json = await getTMDb("trending/all/day?language=en-US", limit)
    return json; 
}

export const getUpcomingMovies = async (limit: number) => {
    const json = await getTMDb("movie/upcoming?language=en-US&page=1", limit)
    return json; 
}




