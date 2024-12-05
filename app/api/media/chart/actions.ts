import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOption";
import prisma from "@/prisma";
import { getUserFavorite } from "../actions";

type MediaObject = {
  movie: number;
  serie: number;
  anime: number;
};

export interface MediaByYear {
  year: string;
  movie: number;
  serie: number;
  anime: number;
}

export const getRatingCountByYearOfMediaReleaseDate = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return null;
    }

    const startYear = 1980;
    const currentYear = new Date().getFullYear();

    const medias = await prisma.media.findMany({
      where: {
        userId: session.user.id,
        point: {
          not: -1,
        },
      },
      select: {
        mediaReleaseDate: true,
        mediaType: true,
      },
    });

    const acc = medias.reduce((acc: Record<string, MediaObject>, media) => {
      if (!media.mediaReleaseDate) return acc;
      const year = new Date(media.mediaReleaseDate).getFullYear();
      acc[year] = acc[year] || { movie: 0, serie: 0, anime: 0 };
      if (media.mediaType) {
        if (
          media.mediaType === "movie" ||
          media.mediaType === "serie" ||
          media.mediaType === "anime"
        ) {
          acc[year][media.mediaType] = (acc[year][media.mediaType] || 0) + 1;
        }
      }
      return acc;
    }, {});

    const result: MediaByYear[] = [];

    for (let i = startYear; i <= currentYear; i++) {
      result.push({
        year: i.toString(),
        movie: acc[i]?.movie || 0,
        serie: acc[i]?.serie || 0,
        anime: acc[i]?.anime || 0,
      });
    }

    return result;
  } catch (error) {
    throw error;
  }
};

export const getWatchlistCountByYearOfMediaReleaseDate = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return null;
    }

    const startYear = 1980;
    const currentYear = new Date().getFullYear();

    const medias = await prisma.media.findMany({
      where: {
        userId: session.user.id,
        watchListAt: {
          not: null,
        },
      },
      select: {
        mediaReleaseDate: true,
        mediaType: true,
      },
    });

    const acc = medias.reduce((acc: Record<string, MediaObject>, media) => {
      if (!media.mediaReleaseDate) return acc;
      const year = new Date(media.mediaReleaseDate).getFullYear();
      acc[year] = acc[year] || { movie: 0, serie: 0, anime: 0 };
      if (media.mediaType) {
        if (
          media.mediaType === "movie" ||
          media.mediaType === "serie" ||
          media.mediaType === "anime"
        ) {
          acc[year][media.mediaType] = (acc[year][media.mediaType] || 0) + 1;
        }
      }
      return acc;
    }, {});

    const result: MediaByYear[] = [];

    for (let i = startYear; i <= currentYear; i++) {
      result.push({
        year: i.toString(),
        movie: acc[i]?.movie || 0,
        serie: acc[i]?.serie || 0,
        anime: acc[i]?.anime || 0,
      });
    }

    return result;
  } catch (error) {
    throw error;
  }
};

function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export const getGenreStats = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return null;
    }

    const watchlistWeight = 0.5;
    const ratingWeight = 0.5;
    const favoriteWeight = 1;

    const coreGenre = [
      "action",
      "adventure",
      "comedy",
      "drama",
      "fantasy",
      "horror",
      "mystery",
      "romance",
      "sci-fi",
      "thriller",
    ];

    const medias = await prisma.media.findMany({
      where: { userId: session.user.id },
    });

    type Genre = {
      id: string;
      name: string;
    };
    // set up the acc
    const acc: Record<string, number> = {};
    coreGenre.forEach((genre) => {
      acc[capitalizeFirstLetter(genre)] = 1;
    });

    // count the genre
    medias.forEach((media) => {
      if (media.mediaGenres) {
        (media.mediaGenres as Genre[]).forEach((genre: Genre) => {
          if (coreGenre.includes(genre.name.toLowerCase())) {
            const genreName = genre.name;

            // your logic to compute the score
            if (!!media.watchListAt) {
              acc[genreName] = (acc[genreName] || 0) + watchlistWeight;
            }
            if (!!media.ratedAt) {
              acc[genreName] =
                (acc[genreName] || 0) + ratingWeight * media.point;
            }
            if (!!media.favoriteAt) {
              acc[genreName] = (acc[genreName] || 0) + favoriteWeight;
            }
          }
        });
      }
    });

    const maxScore = Math.max(...Object.values(acc));
    const scaleFactor = 10 / maxScore;
    Object.keys(acc).forEach((genre) => {
      acc[genre] *= scaleFactor;
    });
    const result = Object.entries(acc).map(([genre, score]) => ({
      genre,
      score,
    }));

    return result;
  } catch (error) {
    throw error;
  }
};

export interface MediaTotal {
  watchlistTotal: number;
  ratingTotal: number;
  favoriteTotal: number;
}

export const getMediaTotal = async (): Promise<MediaTotal> => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("No session found");
    }

    const userID = session.user.id;

    const watchlistTotal = await prisma.media.count({
      where: { userId: userID, watchListAt: { not: null } },
    });

    const ratingTotal = await prisma.media.count({
      where: { userId: userID, ratedAt: { not: null } },
    });

    const favoriteTotal = await prisma.media.count({
      where: { userId: userID, favoriteAt: { not: null } },
    });

    return { watchlistTotal, ratingTotal, favoriteTotal };
  } catch (error) {
    throw error;
  }
};

export interface WatchlistStatusCountResponse {
  planToWatch: number;
  watching: number;
  watched: number;
  dropped: number;
}

export const getWatchlistStatusCount =
  async (): Promise<WatchlistStatusCountResponse> => {
    try {
      const session = await getServerSession(authOptions);
      if (!session) {
        throw new Error("No session found");
      }

      const userID = session.user.id;

      const planToWatch = await prisma.media.count({
        where: { userId: userID, status: "PLAN_TO_WATCH" },
      });

      const watching = await prisma.media.count({
        where: { userId: userID, status: "WATCHING" },
      });

      const watched = await prisma.media.count({
        where: { userId: userID, status: "WATCHED" },
      });

      const dropped = await prisma.media.count({
        where: { userId: userID, status: "DROPPED" },
      });

      return { planToWatch, watching, watched, dropped };
    } catch (error) {
      throw error;
    }
  };
