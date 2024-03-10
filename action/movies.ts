"use server"

import { MediaInfoProps } from "@/wrapper/handled";
import { getTMDb } from "../wrapper/tmdb";

export const getTrendingAll = async (limit: number) => {
    const res = await getTMDb("trending/all/day?language=en-US", limit)
    return res as MediaInfoProps[]

}

export const getUpcomingMovies = async (limit: number) => {
    const res = await getTMDb("movie/upcoming?language=en-US&page=1", limit)
    return res as MediaInfoProps[]

}




