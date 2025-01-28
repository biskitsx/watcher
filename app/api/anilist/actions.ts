import { MediaInfoProps } from "@/wrapper/media-info";

export const getAnimeMultiplePlatformsRating = async (
  medias: MediaInfoProps[]
) => {
  try {
    const mediasID = medias.map((media) => parseInt(media.id));
    const response = await getRatingFromAnilistGraphql(mediasID);
    const mediasWithMultipleRating = medias.map((media) => {
      const rating = response.data.Page.media.find(
        (m) => m.idMal === parseInt(media.id)
      );
      return {
        ...media,
        multiPlatformRatings: {
          anilist: rating ? rating.meanScore : undefined,
          mal: Math.floor(media.vote_average * 10),
          score: rating ? rating.averageScore : undefined,
        },
      };
    });

    return mediasWithMultipleRating;
  } catch (error) {
    throw error;
  }
};

export const getRatingFromAnilistGraphql = async (idMals: number[]) => {
  try {
    const query = `query($idMal: [Int!], $type: MediaType,) {
            Page {
              media(idMal_in: $idMal, type: $type) {
                id
                idMal
                title {
                  english
                }
                meanScore
                averageScore
              }
            }
          }
    `;

    const variables = {
      idMal: idMals,
      type: "ANIME",
    };

    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const json: AnilistResponse = await response.json();

    return json;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
