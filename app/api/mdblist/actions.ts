import { MediaInfoProps } from "@/wrapper/media-info";
import { MDBListRatingResponse } from "./types";
import { MultiplePlatformsRating } from "../media/types";
type ReturnRating = "imdb" | "tmdb" | "tomatoes" | "score";

export const dynamic = "force-dynamic";

export const getMultiPlatformRating = async (
  medias: MediaInfoProps[],
  mediaType: "movie" | "serie",
  return_rating: ReturnRating[]
) => {
  try {
    // return medias;
    let tmdbKeyPlatFormValue: Map<string, MultiplePlatformsRating> = new Map();
    const platformPromises = return_rating.map(async (platform) => {
      const shouldTime = platform === "imdb" ? true : false;
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
      } else {
        console.warn(`No ratings found for platform: ${platform}`);
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
    throw error;
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
    const json: MDBListRatingResponse = await res.json();
    return json;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
