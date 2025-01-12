import { Media } from "@prisma/client";

export interface MediaInfoProps {
  id?: string;
  title: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  type: "movie" | "serie" | "anime";
  vote_average: number;
  overview: string;
  userMediaData?: Media;
  genres?: { id: number; name: string }[];
  episodes?: number;
}
