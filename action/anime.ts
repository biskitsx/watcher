import { MediaInfoProps } from "@/wrapper/media-info";
import { getJikan, getJikanHelper, getJikanHelperList } from "../wrapper/jikan";
import { getTVDB } from "../wrapper/tvdb"
const ANIME_ID = 27

export const getTopAnime = async (limit: number) => {
    return await getJikanHelperList("top/anime", limit);
}

export const getSearchAnime = async (search: string) => {
    return await getJikanHelperList(`search/anime?q=${search}`, 12);
}

export const getAnimeById = async (id: string) => {
    return await getJikanHelper(`anime/${id}`, 1);
}