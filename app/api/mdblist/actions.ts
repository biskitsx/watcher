import { MediaInfoProps } from "@/wrapper/media-info";
import { MDBListRatingResponse } from "./types";
import { MultiplePlatformsRating } from "../media/types";
export type ReturnRating =
  | "imdb"
  | "tmdb"
  | "tomatoes"
  | "trakt"
  | "letterboxd"
  | "metacritic"
  | "regerebert"
  | "score"
  | "score_average";

export const dynamic = "force-dynamic";

export const getMultiPlatformRating = async (
  medias: MediaInfoProps[],
  mediaType: "movie" | "serie",
  return_rating: ReturnRating[]
) => {
  try {
    let tmdbKeyPlatFormValue: Map<string, MultiplePlatformsRating> = new Map();
    const platformPromises = return_rating.map(async (platform) => {
      const shouldTime =
        platform === "imdb" || platform === "letterboxd" ? true : false;
      const mediasID = medias.map((media) => media.id);

      const response = await getRatingFromMDBList(
        mediasID,
        mediaType,
        platform
      );

      if (response && response.rating) {
        Object.entries(response.rating).forEach(([tmdbID, score]) => {
          let prev =
            tmdbKeyPlatFormValue.get(tmdbID) || ({} as MultiplePlatformsRating);

          tmdbKeyPlatFormValue.set(tmdbID, {
            ...prev,
            [platform]: shouldTime ? score * 10 : score,
          });
        });
      }
    });

    // console.log(tmdbKeyPlatFormValue); // Map should now be populated
    await Promise.all(platformPromises);

    // console.log(tmdbKeyPlatFormValue); // Map should now be populated

    // Add ratings to the media objects
    const newMediasWithMultiPlatformRating: MediaInfoProps[] = medias.map(
      (media) => {
        const rating = tmdbKeyPlatFormValue.get(media.id);
        if (rating) {
          return {
            ...media,
            multiPlatformRatings: rating,
          };
        }
        return media;
      }
    );

    return newMediasWithMultiPlatformRating;
  } catch (error) {
    return medias;
    // throw error;
  }
};

export const getRatingFromMDBList = async (
  tmdbIDs: string[],
  mediaType: "movie" | "serie",
  return_rating: ReturnRating
) => {
  try {
    const tmdbIDsNumber = tmdbIDs.map((id) => parseInt(id));

    const media_type = mediaType === "movie" ? "movie" : "show";
    const api_key = process.env.MDBLIST_TOKEN || "";

    const url = `https://mdblist.com/api/rating/${media_type}/${return_rating}?apikey=${api_key}`;
    const payload = {
      ids: tmdbIDsNumber,
      provider: "tmdb",
    };
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body: JSON.stringify(payload),
      next: { revalidate: 3600 },
    };

    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`Failed to fetch from MDBList: ${res.statusText}`);
    }
    const json: MDBListRatingResponse = await res.json();
    return json;
  } catch (error) {
    // console.log(error);
    throw error;
  }
};
