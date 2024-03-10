import { HandledDataProps} from "./handled"

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
        const json = ((await res.json())["data"] as any[]).slice(0, limit);
        const handled = json.map((item: any) => {
          // attach a new data to each item
          const handled_data: HandledDataProps = {
            poster_path: item.images.jpg.image_url,
            backdrop_path: item.trailer.images.maximum_image_url,
            release_date: item.aired.to,
            title: item.title
          }
          item.handled_data = handled_data
          return item
        })
        return handled
        
      } catch (error) {
        console.error('error:', error);
      }
    
}