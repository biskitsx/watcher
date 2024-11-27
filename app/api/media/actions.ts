"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption";
import prisma from "@/prisma";
import { MediaInfoProps } from "@/wrapper/media-info";
import { Media, Role, Status } from "@prisma/client";
import { getServerSession } from "next-auth";

export const addRateTomedia = async (media: MediaInfoProps, rating: number) => {
  try {
    const session = await getServerSession(authOptions);

    // TODO: change logic to search in media array on user
    const existingMedia = await prisma.media.findFirst({
      where: {
        userId: session?.user.id,
        mediaId: media.id,
        mediaType: media.type,
      },
    });
    if (existingMedia) {
      await prisma.media.update({
        where: { id: existingMedia.id },
        data: {
          point: rating,
          ratedAt: new Date(),
        },
      });
    } else {
      await prisma.media.create({
        data: {
          userId: session?.user.id!,
          mediaId: media.id ? media.id : "test",
          point: rating,
          mediaType: media.type,
          mediaTitle: media.title,
          mediaPoster: media.poster_path,
          mediaBackDrop: media.backdrop_path
            ? media.backdrop_path
            : media.poster_path,
          mediaReleaseDate: media.release_date,
          mediaOverview: media.overview,
          mediaVoteAverage: media.vote_average,
          status: Status.NOTHING,
          ratedAt: new Date(),
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
};
export const addRateTomediaWithMedia = async (media: Media, rating: number) => {
  try {
    const session = await getServerSession(authOptions);
    // TODO: change logic to search in media array on user
    const existingMedia = await prisma.media.findFirst({
      where: {
        userId: session?.user.id,
        mediaId: media.mediaId,
        mediaType: media.mediaType,
      },
    });
    if (existingMedia) {
      await prisma.media.update({
        where: { id: existingMedia.id },
        data: {
          point: rating,
          ratedAt: new Date(),
        },
      });
    } else {
      await prisma.media.create({
        data: {
          userId: session?.user.id!,
          mediaId: media.id ? media.id : "test",
          point: rating,
          mediaType: media.mediaType,
          mediaTitle: media.mediaTitle,
          mediaPoster: media.mediaPoster,
          mediaBackDrop: media.mediaBackDrop
            ? media.mediaBackDrop
            : media.mediaPoster,
          mediaReleaseDate: media.mediaReleaseDate,
          mediaOverview: media.mediaOverview,
          mediaVoteAverage: media.mediaVoteAverage,
          status: Status.NOTHING,
          ratedAt: new Date(),
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const toggleWatchList = async (media: MediaInfoProps) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return null;
  }

  const existingMedia = await prisma.media.findFirst({
    where: {
      userId: session?.user.id,
      mediaId: media.id,
      mediaType: media.type,
    },
  });
  if (existingMedia) {
    const isPrevNothing = existingMedia.status === Status.NOTHING;
    await prisma.media.update({
      where: { id: existingMedia.id },
      data: {
        status: isPrevNothing ? Status.WATCHING : Status.NOTHING,
        watchListAt: isPrevNothing ? new Date() : null,
      },
    });
  } else {
    await prisma.media.create({
      data: {
        userId: session?.user.id!,
        mediaId: media.id ? media.id : "test",
        mediaType: media.type,
        mediaTitle: media.title,
        mediaPoster: media.poster_path,
        mediaBackDrop: media.backdrop_path
          ? media.backdrop_path
          : media.poster_path,
        mediaReleaseDate: media.release_date ? media.release_date : "",
        status: Status.WATCHING,
        mediaOverview: media.overview,
        mediaVoteAverage: media.vote_average,
        watchListAt: new Date(),
      },
    });
  }
};

export const toggleWatchListInRating = async (media: Media) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return null;
  }
  const existingMedia = await prisma.media.findFirst({
    where: {
      userId: session?.user.id,
      mediaId: media.mediaId,
      mediaType: media.mediaType,
    },
  });
  if (existingMedia) {
    const isPrevNothing = existingMedia.status === Status.NOTHING;
    await prisma.media.update({
      where: { id: existingMedia.id },
      data: {
        status: isPrevNothing ? Status.WATCHING : Status.NOTHING,
        watchListAt: isPrevNothing ? new Date() : null,
      },
    });
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

export const getUserWatchList = async (): Promise<Media[] | null> => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  const userMedia = await prisma.media.findMany({
    where: { userId: session?.user.id, status: { not: Status.NOTHING } },
    orderBy: { watchListAt: "desc" },
  });
  return userMedia as Media[];
};

export const getUserRatings = async (): Promise<Media[] | null> => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  const userMedia = await prisma.media.findMany({
    where: { userId: session?.user.id, point: { not: -1 } },
    orderBy: { ratedAt: "desc" },
  });
  return userMedia as Media[];
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

export const updateMediaStatus = async (
  mediaType: string,
  mediaId: string,
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
      },
    });
    return existingMedia;
  }
  return null;
};

export const updateMediaRating = async (
  mediaType: string,
  mediaId: string,
  rating: number
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
        point: rating,
      },
    });
    return existingMedia;
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

export const toggleFavorite = async (media: Media) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return null;
    }

    const existingMedia = await prisma.media.findFirst({
      where: {
        userId: session?.user.id,
        mediaId: media.mediaId,
        mediaType: media.mediaType,
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
      await prisma.media.create({
        data: {
          userId: session?.user.id!,
          mediaId: media.id ? media.id : "test",
          mediaType: media.mediaType,
          mediaTitle: media.mediaTitle,
          mediaPoster: media.mediaPoster,
          mediaBackDrop: media.mediaBackDrop
            ? media.mediaBackDrop
            : media.mediaPoster,
          mediaReleaseDate: media.mediaReleaseDate,
          mediaOverview: media.mediaOverview,
          mediaVoteAverage: media.mediaVoteAverage,
          status: Status.NOTHING,
          favoriteAt: new Date(),
        },
      });
    }

    return existingMedia;
  } catch (error) {
    throw error;
  }
};
