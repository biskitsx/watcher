"use server"

import { MediaInfoProps } from "@/wrapper/media-info";
import { getTMDb, getTMDbHelper, getTMDbHelperList, tmdbConvertToMediaInfo, tmdbConvertToMediaInfoList } from "../wrapper/tmdb";

const SERIES = "serie";

export const getAiringTodaySeries = async (limit: number) => {
    const json = await getTMDb("tv/airing_today?language=en-US&page=1", limit)
    const res = tmdbConvertToMediaInfoList(json.results, SERIES)
    return res as MediaInfoProps[]
}

export const getSeriesById = async (id: string) => {
    return await getTMDbHelper(`tv/${id}?language=en-US`, 1, SERIES)
}

export const getTrendingSeries = async (limit: number) => {
    return await getTMDbHelperList("trending/tv/day?language=en-US", limit, SERIES)
}
