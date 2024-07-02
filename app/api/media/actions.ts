"use server"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption"
import prisma from "@/prisma"
import { MediaInfoProps } from "@/wrapper/media-info"
import { Media, Status } from "@prisma/client"
import { getServerSession } from "next-auth"

export const addRateTomedia = async (media: MediaInfoProps, rating: number) => {
    const session = await getServerSession(authOptions)   

    // TODO: change logic to search in media array on user
    const existingMedia = await prisma.media.findFirst({where:{ userId: session?.user.id, mediaId: media.id, mediaType: media.type}})
    if (existingMedia) {
        await prisma.media.update({
            where: {id: existingMedia.id},
            data: {
                point: rating
            }
        })
    } else {
        await prisma.media.create({
            data: {
                userId: session?.user.id!,
                mediaId: media.id ? media.id : "test",
                point: rating,
                mediaType: media.type,
                mediaTitle: media.title,
                mediaPoster: media.poster_path,
                mediaBackDrop: media.backdrop_path ? media.backdrop_path : media.poster_path,
                mediaReleaseDate: media.release_date,
            },
        })
    }
}

export const toggleWatchList = async (media: MediaInfoProps) => {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return null
    }

    const existingMedia = await prisma.media.findFirst({where:{ userId: session?.user.id, mediaId: media.id, mediaType: media.type}})
    if (existingMedia) {
        await prisma.media.update({
            where: {id: existingMedia.id},
            data: {
                status: existingMedia.status === Status.NOTHING ? Status.WATCHING : Status.NOTHING
            }
        })
    } else {
        await prisma.media.create({
            data: {
                userId: session?.user.id!,
                mediaId: media.id ? media.id : "test",
                mediaType: media.type,
                mediaTitle: media.title,
                mediaPoster: media.poster_path,
                mediaBackDrop: media.backdrop_path ? media.backdrop_path : media.poster_path,
                mediaReleaseDate: media.release_date ? media.release_date : "",
                status: Status.WATCHING,
            },
        })
    }
}


export const getMediaRatingAndStatus = async (type: string, id: string) => {
    const session = await getServerSession(authOptions)   

    const media = await prisma.media.findFirst({where:{ userId: session?.user.id, mediaId: id, mediaType: type}})
    if (media) {
        return {rating: media.point, status: media.status}
    } else {
        return null
    }
}

export interface MediaMap {
    userMovieMap: Map<string, Media>;
    userSerieMap: Map<string, Media>;
    userAnimeMap: Map<string, Media>;
}

export const getUserWatchList = async (): Promise<Media[] | null> => {
    const session = await getServerSession(authOptions)
    if (!session) {
        return null
    }
    const userMedia =  await prisma.media.findMany({where:{ userId: session?.user.id, status: {not: Status.NOTHING}}})
    return userMedia as Media[];
}

export const getUserRatings = async (): Promise<Media[] | null> => {
    const session = await getServerSession(authOptions)
    if (!session) {
        return null
    }
    const userMedia =  await prisma.media.findMany({where:{ userId: session?.user.id, point: {not: -1}}})
    return userMedia as Media[];
}

export const getUserDataMedia = async (): Promise<MediaMap | null> => {
    const session = await getServerSession(authOptions)
    if (!session) {
        return null
    }
    // create movies map
    const userMovie =  await prisma.media.findMany({where:{ userId: session?.user.id, mediaType: "movie"}})
    const userMovieMap = new Map<string, Media>();
    userMovie.forEach((media) => {
        userMovieMap.set(media.mediaId, media);
    });
    
    // create series map
    const userSerie =  await prisma.media.findMany({where:{ userId: session?.user.id, mediaType: "serie"}})
    const userSerieMap = new Map<string, Media>();
    userSerie.forEach((media) => {
        userSerieMap.set(media.mediaId, media);
    });
    
    // create anime map
    const userAnime =  await prisma.media.findMany({where:{ userId: session?.user.id, mediaType: "anime"}})
    const userAnimeMap = new Map<string, Media>();
    userAnime.forEach((media) => {
        userAnimeMap.set(media.mediaId, media);
    });

    return {userMovieMap, userSerieMap, userAnimeMap};
}


export const updateMediaStatus = async (mediaType: string, mediaId: string, status: Status) => {
    const session = await getServerSession(authOptions)
    if (!session) {
        return null
    }
    const existingMedia = await prisma.media.findFirst({where:{ userId: session?.user.id, mediaId: mediaId, mediaType: mediaType}})
    if (existingMedia) {
        const eiei = await prisma.media.update({
            where: {id: existingMedia.id},
            data: {
                status: status
            }
        })
        return existingMedia
    }
    return null
}

export const updateMediaRating = async (mediaType: string, mediaId: string, rating: number) => {
    const session = await getServerSession(authOptions)
    if (!session) {
        return null
    }
    const existingMedia = await prisma.media.findFirst({where:{ userId: session?.user.id, mediaId: mediaId, mediaType: mediaType}})
    if (existingMedia) {
        const eiei = await prisma.media.update({
            where: {id: existingMedia.id},
            data: {
                point: rating
            }
        })
        return existingMedia
    }
    return null
}