"use server";
import { MediaInfoProps } from "@/wrapper/media-info";
import {
  getJikan,
  getJikanHelper,
  getJikanHelperList,
} from "../../../wrapper/jikan";
import { getUserDataMedia } from "../media/actions";
import { Character, PaginationProps, SearchProps } from "../media/types";
import { getAnimeMultiplePlatformsRating } from "../anilist/actions";

export const getTopAnime = async ({ page }: PaginationProps) => {
  return await getJikanHelperList("top/anime?page=" + page);
};

export const getRecommendAnime = async () => {
  return await getJikanHelperList("recommend/anime");
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

const jikanConvertToMediaInfoListRecommend = (
  items: any[],
  userDataMedia?: any
) => {
  return items?.map((item) => {
    const { entry, votes } = item;
    let media: MediaInfoProps = {
      id: String(entry.mal_id),
      poster_path: entry?.images?.jpg.image_url
        ? entry?.images?.jpg?.image_url
        : "",
      backdrop_path: entry?.trailer?.images?.maximum_image_url
        ? entry?.trailer?.images?.maximum_image_url
        : entry?.images?.jpg?.image_url,
      release_date: "",
      title: entry.title,
      type: "anime",
      vote_average: 0,
      overview: "",
      episodes: 0,
    };

    if (userDataMedia) {
      if (userDataMedia.userAnimeMap.has(String(media.id))) {
        media.userMediaData = userDataMedia.userAnimeMap.get(String(media.id));
      }
    }

    return media;
  });
};

export const getAnimeRecommendationsByJikan = async (id: number) => {
  try {
    const json = await getJikan(`anime/${id}/recommendations`);
    const userDataMedia = await getUserDataMedia();
    if (userDataMedia) {
      const res = jikanConvertToMediaInfoListRecommend(
        json.data as any[],
        userDataMedia
      );
      const multiplePlatform = await getAnimeMultiplePlatformsRating(res);
      return multiplePlatform;
    }
    const res = jikanConvertToMediaInfoListRecommend(json.data);
    const multiplePlatform = await getAnimeMultiplePlatformsRating(res);
    return multiplePlatform;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
