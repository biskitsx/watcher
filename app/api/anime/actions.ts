"use server";
import { MediaInfoProps } from "@/wrapper/media-info";
import {
  getJikan,
  getJikanHelper,
  getJikanHelperList,
} from "../../../wrapper/jikan";
import { getTVDB } from "../../../wrapper/tvdb";
import { Character, PaginationProps, SearchProps } from "../media/types";
const ANIME_ID = 27;

export const getTopAnime = async ({ page }: PaginationProps) => {
  return await getJikanHelperList("top/anime?page=" + page);
};

export const searchAnime = async ({ page, query }: SearchProps) => {
  return await getJikanHelperList(`anime?q=${query}&page=${page}`);
};

export const getAnimeById = async (id: string) => {
  return await getJikanHelper(`anime/${id}`);
};

export const getAnimeCharacters = async (id: string) => {
  const { data }: { data: any[] } = await getJikan(`anime/${id}/characters`);
  const res = data.map(({ character }) => {
    const image = character?.images?.jpg?.image_url;
    const char: Character = {
      name: character.name,
      image: image ? image : "",
      url: character.url,
    };
    return char;
  });
  return res;
};
