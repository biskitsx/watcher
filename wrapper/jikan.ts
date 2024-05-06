import { MediaInfoProps} from "./media-info"

export const jikanConvertToMediaInfo = (item: any): MediaInfoProps => {
  return {
    poster_path: item.images.jpg.image_url,
    backdrop_path: item.trailer.images.maximum_image_url,
    release_date: item.aired.to,
    title: item.title,
    vote_average: item.score,
    type: "anime"
  }
}

export const jikanConvertToMediaInfoList = (json: any[]) => {
  return json?.map((item: any) => {
    return jikanConvertToMediaInfo(item)
  })
}

export const getJikanHelper = async (pathname: string, limit: number) => {
  try {
      const json = await getJikan(pathname, limit)
      const res = jikanConvertToMediaInfoList(json.data)
      return res;
  } catch (error) {
      console.log(error);
      return [] as MediaInfoProps[];
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