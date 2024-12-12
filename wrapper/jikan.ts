import { MediaMap, getUserDataMedia } from "@/app/api/media/actions";
import { MediaInfoProps } from "./media-info";

export const jikanConvertToMediaInfo = (
  item: any,
  userDataMedia?: MediaMap
): MediaInfoProps => {
  const genres = item.genres.map((genre: any) => {
    return {
      id: genre.mal_id,
      name: genre.name,
    };
  });
  let media: MediaInfoProps = {
    id: String(item.mal_id),
    poster_path: item.images.jpg.image_url,
    backdrop_path: item.trailer.images.maximum_image_url
      ? item.trailer.images.maximum_image_url
      : item.images.jpg.image_url,
    release_date: item.aired.to,
    title: item.title,
    type: "anime",
    vote_average: item.score,
    overview: item.synopsis,
    genres: genres,
    episodes: item.episodes,
  };

  if (userDataMedia) {
    if (userDataMedia.userAnimeMap.has(String(media.id))) {
      media.userMediaData = userDataMedia.userAnimeMap.get(String(media.id));
    }
  }

  return media;
};

export const jikanConvertToMediaInfoList = (
  json: any[],
  userDataMedia?: MediaMap
) => {
  return json?.map((item: any) => {
    return jikanConvertToMediaInfo(item, userDataMedia);
  });
};

export const getJikanHelperList = async (pathname: string) => {
  try {
    const json = await getJikan(pathname);
    const userDataMedia = await getUserDataMedia();
    if (userDataMedia) {
      const res = jikanConvertToMediaInfoList(json.data, userDataMedia);
      return res;
    }
    const res = jikanConvertToMediaInfoList(json.data);
    return res;
  } catch (error) {
    console.log(error);
    return [] as MediaInfoProps[];
  }
};

export const getJikanHelper = async (pathname: string) => {
  try {
    const json = await getJikan(pathname);
    const userDataMedia = await getUserDataMedia();
    if (userDataMedia) {
      const res = jikanConvertToMediaInfo(json.data, userDataMedia);
      return res;
    }
    const res = jikanConvertToMediaInfo(json.data);
    return res;
  } catch (error) {
    console.log(error);
    return {} as MediaInfoProps;
  }
};

export const getJikan = async (path: string) => {
  try {
    const url = `https://api.jikan.moe/v4/${path}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    const res = await fetch(url, options);
    const json = await res.json();

    return json;
  } catch (error) {
    console.error("error:", error);
  }
};
