import { MediaInfoProps } from "@/wrapper/media-info";
import { getJikan, getJikanHelper } from "../wrapper/jikan";
import { getTVDB } from "../wrapper/tvdb"
const ANIME_ID = 27

export const getTopAnime = async (limit: number) => {
    return getJikanHelper("top/anime", limit);
}

export const getSearchAnime = async (search: string) => {
    return getJikanHelper(`search/anime?q=${search}`, 12);
}