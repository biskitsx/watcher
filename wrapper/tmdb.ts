import { TMDB_TOKEN } from "@/data/baseUrl";
import { HandledDataProps, MediaInfoProps} from "./handled"
const tmdbImagesURL = "https://image.tmdb.org/t/p/original";

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
        const json = ((await res.json())['results'] as any[]);
        // const json = ((await res.json())['results'] as any[]).slice(0, limit) as any[];

        const media = json.map((item: any) => {
          const handled_data: MediaInfoProps = {
            poster_path: `${tmdbImagesURL}/${item.poster_path}`,
            backdrop_path: `${tmdbImagesURL}/${item.backdrop_path}`,
            release_date: item.release_date
            ? item.release_date
            : item.first_air_date,
            title: item.title ? item.title : item.name
          }
          return handled_data
        })
        return media
        
      } catch (error) {
        console.error('error:', error);
        return []
      }
    
}