"use server";
import prisma from "@/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOption";

export interface CreateReviewParams {
  title: string;
  content: string;
  point: number;
  mediaId: string;
  mediaType: string;
}
export const CreateReview = async ({
  title,
  content,
  point,
  mediaId,
  mediaType,
}: CreateReviewParams) => {
  try {
    console.log({ title, content, point, mediaId, mediaType });
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("Unauthorized");
    }
    const userID = session.user.id;
    const review = await prisma.review.create({
      data: {
        title,
        point,
        content,
        userId: userID,
        mediaId,
        mediaType,
      },
    });
    return review;
  } catch (error) {
    throw error;
  }
};

export const GetReviewByMedia = async (mediaID: string, mediaType: string) => {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        mediaId: mediaID,
        mediaType: mediaType,
      },
    });
    return reviews;
  } catch (error) {
    throw error;
  }
};
