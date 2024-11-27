import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOption";
import prisma from "@/prisma";

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
