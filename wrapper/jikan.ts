import { MediaMap, getUserDataMedia } from "@/action/media"
import { MediaInfoProps} from "./media-info"

export const jikanConvertToMediaInfo = (item: any, userDataMedia?: MediaMap): MediaInfoProps => {
  let media: MediaInfoProps = {
    id: String(item.mal_id),
    poster_path: item.images.jpg.image_url,
    backdrop_path: item.trailer.images.maximum_image_url,
    release_date: item.aired.to,
    title: item.title,
    type: "anime",
    vote_average: item.score,
    overview: item.synopsis,
  }

  if (userDataMedia) {
    if (userDataMedia.userAnimeMap.has(String(media.id))) {
      media.userMediaData = userDataMedia.userAnimeMap.get(String(media.id))
    }
  }

  return media;
}

export const jikanConvertToMediaInfoList = (json: any[], userDataMedia?: MediaMap) => {
  return json?.map((item: any) => {
    return jikanConvertToMediaInfo(item, userDataMedia)
  })
}

export const getJikanHelperList = async (pathname: string, limit: number) => {
  try {
      const json = await getJikan(pathname, limit)
      const userDataMedia = await getUserDataMedia()
      if (userDataMedia) {
        const res = jikanConvertToMediaInfoList(json.data, userDataMedia)
        return res 
      }
      const res = jikanConvertToMediaInfoList(json.data)
      return res;
  } catch (error) {
      console.log(error);
      return [] as MediaInfoProps[];
  }    
}

export const getJikanHelper = async (pathname: string, limit: number) => {
  try {
      const json = await getJikan(pathname, limit)
      const userDataMedia = await getUserDataMedia()
      if (userDataMedia) {
        const res = jikanConvertToMediaInfo(json.data, userDataMedia)
        return res;
        
      }
      const res = jikanConvertToMediaInfo(json.data)
      return res;
  } catch (error) {
      console.log(error);
      return {} as MediaInfoProps;
  }    
}


export const getJikan = async (path: string, limit: number) => {
    try {
        const url = `https://api.jikan.moe/v4/${path}`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
            }
        };

        const res = await fetch(url, options);
        const json = await res.json()
        return json ;
        
      } catch (error) {
        console.error('error:', error);
      }
}