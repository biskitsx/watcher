"use server";

import { MediaInfoProps } from "@/wrapper/media-info";
import { RecommendMedia } from "./types";
import { authOptions } from "../auth/[...nextauth]/authOption";
import { getServerSession } from "next-auth";
import { tmdbImagesURL } from "@/data/baseUrl";
import {
  getSerieRecommendationsFromTMDB,
  getTopRatedSeries,
} from "../serie/actions";
import {
  getMovieRecommendationsFromTMDB,
  getTopRatedMovies,
} from "../movie/actions";
import { getAnimeRecommendationsByJikan, getTopAnime } from "../anime/actions";
import prisma from "@/prisma";
import { getMultiPlatformRating } from "../mdblist/actions";
import { getAnimeMultiplePlatformsRating } from "../anilist/actions";
import { cache } from "react";

const getBaseModelAPI = cache(async () => {
  const config = await prisma.config.findUnique({
    where: {
      key: "base_model_api",
    },
  });
  if (!config) {
    throw new Error("Base model API is not set");
  }
  return config.value;
});
const getModelRecommendations = async (
  mediaType: "movie" | "serie" | "anime",
  predictType: string,
  reqBody: any
) => {
  try {
    const correctMediaType = mediaType === "serie" ? "tv" : mediaType;
    const baseURL = await getBaseModelAPI();
    const url = `${baseURL}/${correctMediaType}/recommendations/${predictType}`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 300, // Cache duration: 300 seconds (5 minutes)
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    const data: RecommendMedia[] = await response.json();

    const convertedData: MediaInfoProps[] = data.map((media) => {
      let imageURL, voteAverage, title, releaseDate;
      if (mediaType === "movie") {
        imageURL = tmdbImagesURL + media.poster_path;
        voteAverage = media.vote_average;
        title = media.title;
        releaseDate = media.release_date;
      } else if (mediaType === "serie") {
        imageURL = tmdbImagesURL + media.poster_path;
        voteAverage = media.vote_average;
        title = media.name;
        releaseDate = media.first_air_date;
      } else {
        imageURL = media.image_url;
        voteAverage = media.score;
        title = media.title;
        releaseDate = media.release_date;
      }
      return {
        id: media.id.toString(), // Convert 'id' to string
        title: title ?? "", // Assign an empty string if 'title' is undefined
        type: mediaType,
        score: media.vote_average ?? 0, // Use nullish coalescing operator to provide a default value of 0
        backdrop_path: imageURL ?? "",
        overview: "",
        poster_path: imageURL ?? "", // Assign an empty string if 'imageURL' is undefined
        release_date: releaseDate ? releaseDate : "", // Add missing property
        vote_average: voteAverage ?? 0, // Use nullish coalescing operator to provide a default value of 0
      };
    });

    return convertedData;
  } catch (error) {
    throw error;
  }
};

export const getContentBaseRecommendations = async (
  id: number,
  type: "movie" | "serie" | "anime",
  additionalMedia?: MediaInfoProps
) => {
  try {
    const payload = {
      mediaId: id,
      number: 20,
    };

    const recommendations = await getModelRecommendations(
      type,
      "content",
      payload
    );

    const medias = additionalMedia
      ? [...recommendations, additionalMedia]
      : recommendations;
    if (type === "anime") {
      const multiplatform = await getAnimeMultiplePlatformsRating(medias);
      return multiplatform;
    }
    const multiplatform = await getMultiPlatformRating(medias, type, [
      "tomatoes",
      "imdb",
      "tmdb",
      "score",
    ]);

    return multiplatform;
  } catch (error) {
    let someMedias = [];
    if (type === "serie") {
      someMedias = await getSerieRecommendationsFromTMDB(id);
    } else if (type === "movie") {
      someMedias = await getMovieRecommendationsFromTMDB(id);
    } else {
      someMedias = await getAnimeRecommendationsByJikan(id);
    }
    return someMedias;
  }
};

export const getUserBaseRecommendations = async (
  type: "movie" | "serie" | "anime"
) => {
  try {
    const session = await getServerSession(authOptions);
    const userID = session?.user?.id;

    const payload = {
      userId: userID,
      number: 20,
    };
    const recommendations = await getModelRecommendations(
      type,
      "user",
      payload
    );

    if (type === "anime") {
      const multiplatform = await getAnimeMultiplePlatformsRating(
        recommendations
      );
      return multiplatform;
    }
    const multiplatform = await getMultiPlatformRating(recommendations, type, [
      "tomatoes",
      "imdb",
      "tmdb",
      "score",
    ]);

    return multiplatform;
  } catch (error) {
    let someMedias = [];
    if (type === "anime") {
      someMedias = await getTopAnime({ page: 1 });
    } else if (type === "movie") {
      someMedias = await getTopRatedMovies();
    } else {
      someMedias = await getTopRatedSeries({ page: 1 });
    }
    console.log(error);
    return someMedias;
  }
};

export const checkRecommendServiceAvailability = async () => {
  try {
    const baseURL = await getBaseModelAPI();
    const url = `${baseURL}/docs`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
