import { TMDB_TOKEN } from "@/data/baseUrl";
import { MediaInfoProps} from "./media-info"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption";
import { Session, getServerSession } from "next-auth";
import prisma from "@/prisma";
import { Media } from "@prisma/client";
import { MediaMap, getUserDataMedia } from "@/action/media";
const tmdbImagesURL = "https://image.tmdb.org/t/p/original";

export const tmdbConvertToMediaInfo =  (item: any, type: "movies" | "series", userDataMedia?: MediaMap): MediaInfoProps=> {
  let media: MediaInfoProps = {
    id: String(item.id),
    poster_path: `${tmdbImagesURL}/${item.poster_path}`,
    backdrop_path: `${tmdbImagesURL}/${item.backdrop_path}`,
    release_date: item.release_date
    ? item.release_date
    : item.first_air_date,
    title: item.title ? item.title : item.name,
    type: type,
    vote_average: item.vote_average,
    overview: item.overview,
  }

  if (userDataMedia) {
    if (type === "movies" && userDataMedia.userMovieMap.has(String(media.id))) {
      media.userMediaData = userDataMedia.userMovieMap.get(String(media.id))
    } else if (type === "series" && userDataMedia.userSerieMap.has(String(media.id))){
      media.userMediaData = userDataMedia.userSerieMap.get(String(media.id))
    }
  }
  return media;
}

export const tmdbConvertToMediaInfoList = (json: any[], type: "movies" | "series", userDataMedia?: MediaMap) : MediaInfoProps[]=> {
  return json?.map((item: any) => {
    return tmdbConvertToMediaInfo(item, type, userDataMedia)
  })
}

export const getTMDbHelperList = async (pathname: string, limit: number, type: "movies" | "series") => {
  try {
    const json = await getTMDb(pathname, limit)
    const userDataMedia = await getUserDataMedia()
    if (userDataMedia) {
      const res = tmdbConvertToMediaInfoList(json.results, type, userDataMedia)
      return res 
    }
    const res = tmdbConvertToMediaInfoList(json.results, type)
    return res;
  } catch (error) {
    return [] as MediaInfoProps[];
  }    
}

export const getTMDbHelper = async (pathname: string, limit: number, type: "movies" | "series") => {
  try {
      const json = await getTMDb(pathname, limit)
      const userDataMedia = await getUserDataMedia()
      if (userDataMedia) {
        const res =  tmdbConvertToMediaInfo(json, type, userDataMedia)
        return res 
      }
      const res =  tmdbConvertToMediaInfo(json, type)
      return res;
  } catch (error) {
      return {} as MediaInfoProps;
  }    
}



export const getTMDb = async (path: string, limit: number) => {
    try {
        const url = `https://api.themoviedb.org/3/${path}`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: TMDB_TOKEN
            }
        };

        const res = await fetch(url, options);
        const json = await res.json()
        return json
        
      } catch (error: any) {
        console.error('error:', error);
        throw new Error(error)
      }
    
}