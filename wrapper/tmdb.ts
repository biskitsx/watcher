import { TMDB_TOKEN } from "@/data/baseUrl";
import { MediaInfoProps} from "./media-info"
const tmdbImagesURL = "https://image.tmdb.org/t/p/original";

export const tmdbConvertToMediaInfo = (item: any): MediaInfoProps => {
  return {
    poster_path: `${tmdbImagesURL}/${item.poster_path}`,
    backdrop_path: `${tmdbImagesURL}/${item.backdrop_path}`,
    release_date: item.release_date
    ? item.release_date
    : item.first_air_date,
    title: item.title ? item.title : item.name,
    type: item.media_type,
    vote_average: item.vote_average
  }
}

export const tmdbConvertToMediaInfoList = (json: any[]) => {
  return json?.map((item: any) => {
    return tmdbConvertToMediaInfo(item)
  })
}

export const getTMDbHelper = async (pathname: string, limit: number) => {
  try {
      const json = await getTMDb(pathname, limit)
      const res = tmdbConvertToMediaInfoList(json.results)
      return res;
  } catch (error) {
      console.log(error);
      return [] as MediaInfoProps[];
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