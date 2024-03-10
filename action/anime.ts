import { MediaInfoProps } from "@/wrapper/handled";
import { getJikan } from "../wrapper/jikan";
import { getTVDB } from "../wrapper/tvdb"
const ANIME_ID = 27

export const getTopAnime = async (limit: number) => {
    const res = await getJikan("top/anime", limit) ;
    return res as MediaInfoProps[]
}

export const getSearchAnime = async (search: string) => {
    const res = await getJikan(`anime?q=${search}`, 12)
    return res as MediaInfoProps[]
}