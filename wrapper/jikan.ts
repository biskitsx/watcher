import { HandledDataProps, MediaInfoProps} from "./handled"

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
        const json = ((await res.json())["data"] as any[]);
        // const json = ((await res.json())["data"] as any[]).slice(0, limit);
        const media = json?.map((item: any) => {
          const handled_data: MediaInfoProps = {
            poster_path: item.images.jpg.image_url,
            backdrop_path: item.trailer.images.maximum_image_url,
            release_date: item.aired.to,
            title: item.title
          }
          return handled_data
        })
        return media
        
      } catch (error) {
        console.error('error:', error);
      }
    
}