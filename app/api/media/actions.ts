"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption";
import prisma from "@/prisma";
import { Media, Status } from "@prisma/client";
import { getServerSession } from "next-auth";
import { getMovieById } from "../movie/actions";
import { getSeriesById } from "../serie/actions";
import { getAnimeById } from "../anime/actions";

export const getMediaInfo = async (mediaID: string, mediaType: string) => {
  switch (mediaType) {
    case "movie":
      return await getMovieById(mediaID);
    case "serie":
      return await getSeriesById(mediaID);
    case "anime":
      return await getAnimeById(mediaID);
    default:
      throw new Error("Invalid media type");
  }
};

export const addRating = async (
  mediaID: string,
  mediaType: string,
  rating: number
) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("User not authenticated");
    }

    const existingMedia = await prisma.media.findFirst({
      where: {
        userId: session?.user.id,
        mediaId: mediaID,
        mediaType: mediaType,
      },
    });

    const mediaInfo = await getMediaInfo(mediaID, mediaType);

    if (existingMedia) {
      const removeFromRating = rating === -1;
      await prisma.media.update({
        where: { id: existingMedia.id },
        data: {
          point: rating,
          ratedAt: removeFromRating ? null : new Date(),
          mediaVoteAverage: mediaInfo.vote_average,
          episodes: mediaInfo.episodes,
        },
      });
    } else {
      await prisma.media.create({
        data: {
          userId: session?.user.id!,
          mediaId: mediaID,
          mediaType: mediaType,
          mediaTitle: mediaInfo.title,
          mediaPoster: mediaInfo.poster_path,
          mediaBackDrop: mediaInfo.backdrop_path
            ? mediaInfo.backdrop_path
            : mediaInfo.poster_path,
          mediaReleaseDate: mediaInfo.release_date,
          mediaOverview: mediaInfo.overview,
          mediaVoteAverage: mediaInfo.vote_average,
          point: rating,
          ratedAt: new Date(),
          mediaGenres: mediaInfo.genres,
          episodes: mediaInfo.episodes,
        },
      });
    }
  } catch (error) {
    throw error;
  }
};

export const getMediaRatingAndStatus = async (type: string, id: string) => {
  const session = await getServerSession(authOptions);

  const media = await prisma.media.findFirst({
    where: { userId: session?.user.id, mediaId: id, mediaType: type },
  });
  if (media) {
    return { rating: media.point, status: media.status };
  } else {
    return null;
  }
};

export interface MediaMap {
  userMovieMap: Map<string, Media>;
  userSerieMap: Map<string, Media>;
  userAnimeMap: Map<string, Media>;
}

export type SortBy =
  | "rating"
  | "last_rated"
  | "last_watchlist"
  | "title"
  | "popularity"
  | "";
interface GetMediaProps {
  status?: string;
  mediaType?: string;
  sortBy?: SortBy;
}

const getOrderByForRating = (sortBy: SortBy) => {
  switch (sortBy) {
    case "rating":
      return { point: "desc" };
    case "last_rated":
      return { ratedAt: "desc" };
    case "last_watchlist":
      return { watchListAt: "desc" };
    case "title":
      return { mediaTitle: "asc" };
    case "popularity":
      return { mediaVoteAverage: "desc" };
    default:
      return { ratedAt: "desc" };
  }
};
const getOrderByForWatchlist = (sortBy: SortBy) => {
  switch (sortBy) {
    case "rating":
      return { point: "desc" };
    case "last_rated":
      return { ratedAt: "desc" };
    case "last_watchlist":
      return { watchListAt: "desc" };
    case "title":
      return { mediaTitle: "asc" };
    case "popularity":
      return { mediaVoteAverage: "desc" };
    default:
      return { watchListAt: "desc" };
  }
};
export const getUserWatchList = async (
  props?: GetMediaProps
): Promise<Media[]> => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("User not authenticated");
  }
  const isWatchlist = props?.status === undefined || props?.status === "";
  const { status = "", mediaType = "", sortBy = "" } = props || {};
  const orderBy = getOrderByForWatchlist(sortBy);
  const userMedia = await prisma.media.findMany({
    where: {
      userId: session?.user.id,
      watchListAt: { not: null },
      status: isWatchlist ? { not: Status.NOTHING } : (props?.status as Status),
      mediaType: mediaType === "" ? undefined : mediaType,
    },
    orderBy: orderBy as any,
  });
  return userMedia as Media[];
};

export const getUserRatings = async (
  props?: GetMediaProps
): Promise<Media[]> => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("User not authenticated");
  }
  const { status = "", mediaType = "", sortBy = "" } = props || {};
  const orderBy = getOrderByForRating(sortBy);
  const userMedia = await prisma.media.findMany({
    where: {
      userId: session?.user.id,
      ratedAt: { not: null },
      status: status === "" ? undefined : (props?.status as Status),
      mediaType: mediaType === "" ? undefined : mediaType,
    },
    orderBy: orderBy as any,
  });
  return userMedia as Media[];
};

export const getUserFavorite = async (): Promise<Media[]> => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("User not authenticated");
    }
    const userMedia = await prisma.media.findMany({
      where: { userId: session?.user.id, favoriteAt: { not: null } },
    });
    return userMedia as Media[];
  } catch (error) {
    throw error;
  }
};

export const getUserDataMedia = async (): Promise<MediaMap | null> => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  // create movies map
  const userMovie = await prisma.media.findMany({
    where: { userId: session?.user.id, mediaType: "movie" },
  });
  const userMovieMap = new Map<string, Media>();
  userMovie.forEach((media) => {
    userMovieMap.set(media.mediaId, media);
  });

  // create series map
  const userSerie = await prisma.media.findMany({
    where: { userId: session?.user.id, mediaType: "serie" },
  });
  const userSerieMap = new Map<string, Media>();
  userSerie.forEach((media) => {
    userSerieMap.set(media.mediaId, media);
  });

  // create anime map
  const userAnime = await prisma.media.findMany({
    where: { userId: session?.user.id, mediaType: "anime" },
  });
  const userAnimeMap = new Map<string, Media>();
  userAnime.forEach((media) => {
    userAnimeMap.set(media.mediaId, media);
  });

  return { userMovieMap, userSerieMap, userAnimeMap };
};

export const updateWatchlistStatus = async (
  mediaId: string,
  mediaType: string,
  status: Status
) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  const existingMedia = await prisma.media.findFirst({
    where: { userId: session?.user.id, mediaId: mediaId, mediaType: mediaType },
  });
  const mediaInfo = await getMediaInfo(mediaId, mediaType);
  if (existingMedia) {
    await prisma.media.update({
      where: { id: existingMedia.id },
      data: {
        status: status,
        watchListAt: status !== Status.NOTHING ? new Date() : null,
        mediaVoteAverage: mediaInfo.vote_average,
        episodes: mediaInfo.episodes,
      },
    });
    return existingMedia;
  } else {
    await prisma.media.create({
      data: {
        userId: session?.user.id!,
        mediaId: mediaId,
        mediaType: mediaType,
        mediaTitle: mediaInfo.title,
        mediaPoster: mediaInfo.poster_path,
        mediaBackDrop: mediaInfo.backdrop_path
          ? mediaInfo.backdrop_path
          : mediaInfo.poster_path,
        mediaReleaseDate: mediaInfo.release_date,
        mediaOverview: mediaInfo.overview,
        mediaVoteAverage: mediaInfo.vote_average,
        point: -1,
        watchListAt: new Date(),
        status: Status.PLAN_TO_WATCH,
        mediaGenres: mediaInfo.genres,
        episodes: mediaInfo.episodes,
      },
    });
  }
  return null;
};
export interface MediaAverageScore {
  movieAvg: number;
  serieAvg: number;
  animeAvg: number;
}

export const getMediaAverage = async () => {
  try {
    const session = await getServerSession(authOptions);

    const avgs = await prisma.media.groupBy({
      where: { userId: session?.user.id, point: { not: -1 } },
      by: ["mediaType"],
      _avg: {
        point: true,
      },
    });

    let movieAvg = 0,
      serieAvg = 0,
      animeAvg = 0;

    avgs.forEach((avg) => {
      if (avg._avg.point != null) {
        if (avg.mediaType === "movie") {
          movieAvg = avg._avg.point;
        } else if (avg.mediaType === "serie") {
          serieAvg = avg._avg.point;
        } else {
          animeAvg = avg._avg.point;
        }
      }
    });

    return { movieAvg, serieAvg, animeAvg } as MediaAverageScore;
  } catch (error) {
    throw error;
  }
};

export const toggleFavorite = async (mediaID: string, mediaType: string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return null;
    }

    const existingMedia = await prisma.media.findFirst({
      where: {
        userId: session?.user.id,
        mediaId: mediaID,
        mediaType: mediaType,
      },
    });

    const mediaInfo = await getMediaInfo(mediaID, mediaType);
    if (existingMedia) {
      await prisma.media.update({
        where: { id: existingMedia.id },
        data: {
          favoriteAt: !!existingMedia.favoriteAt ? null : new Date(),
          mediaVoteAverage: mediaInfo.vote_average,
          episodes: mediaInfo.episodes,
        },
      });
    } else {
      await prisma.media.create({
        data: {
          userId: session?.user.id!,
          mediaId: mediaID,
          mediaType: mediaType,
          mediaTitle: mediaInfo.title,
          mediaPoster: mediaInfo.poster_path,
          mediaBackDrop: mediaInfo.backdrop_path
            ? mediaInfo.backdrop_path
            : mediaInfo.poster_path,
          mediaReleaseDate: mediaInfo.release_date,
          mediaOverview: mediaInfo.overview,
          mediaVoteAverage: mediaInfo.vote_average,
          status: Status.NOTHING,
          favoriteAt: new Date(),
          mediaGenres: mediaInfo.genres,
          episodes: mediaInfo.episodes,
        },
      });
    }

    return existingMedia;
  } catch (error) {
    throw error;
  }
};

export const onClickMedia = async (mediaID: string, mediaType: string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return null;
    }

    const mediaInfo = await getMediaInfo(mediaID, mediaType);
    const existingMedia = await prisma.media.findFirst({
      where: {
        userId: session?.user.id,
        mediaId: mediaID,
        mediaType: mediaType,
      },
    });

    if (existingMedia) {
      const updatedMedia = await prisma.media.update({
        where: { id: existingMedia.id },
        data: {
          clickCount: existingMedia.clickCount + 1,
          mediaVoteAverage: mediaInfo.vote_average,
          episodes: mediaInfo.episodes,
        },
      });

      return updatedMedia;
    } else {
      const newMedia = await prisma.media.create({
        data: {
          userId: session?.user.id!,
          mediaId: mediaID,
          mediaType: mediaType,
          mediaTitle: mediaInfo.title,
          mediaPoster: mediaInfo.poster_path,
          mediaBackDrop: mediaInfo.backdrop_path
            ? mediaInfo.backdrop_path
            : mediaInfo.poster_path,
          mediaReleaseDate: mediaInfo.release_date,
          mediaOverview: mediaInfo.overview,
          mediaVoteAverage: mediaInfo.vote_average,
          clickCount: 1,
          mediaGenres: mediaInfo.genres,
          episodes: mediaInfo.episodes,
        },
      });
    }

    return existingMedia;
  } catch (error) {
    throw error;
  }
};

export const onUpdateWatchedEpisodes = async (
  mediaID: string,
  count: number
) => {
  try {
    const media = await prisma.media.findFirst({
      where: { id: mediaID },
    });

    if (media?.episodes && count > media.episodes) {
      throw new Error("Invalid episode count");
    }

    const updatedMedia = await prisma.media.update({
      where: { id: mediaID },
      data: {
        watchedEpisodes: count,
      },
    });

    return updatedMedia;
  } catch (error) {
    throw error;
  }
};
