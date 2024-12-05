"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption";
import prisma from "@/prisma";
import { MediaInfoProps } from "@/wrapper/media-info";
import { Media, Role, Status } from "@prisma/client";
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
      await prisma.media.update({
        where: { id: existingMedia.id },
        data: { point: rating, ratedAt: new Date() },
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

export const getUserWatchList = async (
  props?: GetMediaProps
): Promise<Media[]> => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("User not authenticated");
  }
  const userMedia = await prisma.media.findMany({
    where: {
      userId: session?.user.id,
      status: props?.status === "" ? undefined : (props?.status as Status),
      mediaType: props?.mediaType === "" ? undefined : props?.mediaType,
    },
    orderBy: { watchListAt: "desc" },
  });
  return userMedia as Media[];
};

interface GetMediaProps {
  status?: string;
  mediaType?: string;
}

export const getUserRatings = async (
  props?: GetMediaProps
): Promise<Media[]> => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("User not authenticated");
  }
  const { status = "", mediaType = "" } = props || {};
  const userMedia = await prisma.media.findMany({
    where: {
      userId: session?.user.id,
      point: { not: -1 },
      status: status === "" ? undefined : (status as Status),
      mediaType: mediaType === "" ? undefined : mediaType,
    },
    orderBy: { ratedAt: "desc" },
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
  if (existingMedia) {
    await prisma.media.update({
      where: { id: existingMedia.id },
      data: {
        status: status,
        watchListAt: status !== Status.NOTHING ? new Date() : null,
      },
    });
    return existingMedia;
  } else {
    const mediaInfo = await getMediaInfo(mediaId, mediaType);
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

    if (existingMedia) {
      await prisma.media.update({
        where: { id: existingMedia.id },
        data: {
          favoriteAt: !!existingMedia.favoriteAt ? null : new Date(),
        },
      });
    } else {
      const mediaInfo = await getMediaInfo(mediaID, mediaType);
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
        },
      });
    }

    return existingMedia;
  } catch (error) {
    throw error;
  }
};
