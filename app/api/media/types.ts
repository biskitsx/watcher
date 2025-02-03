export interface SearchProps {
  page: number;
  query: string;
}

export interface PaginationProps {
  page: number;
}

export interface CastProps {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  job: string;
  department: string;
  credit_id: string;
  order: number;
}

export interface Character {
  name: string;
  image: string;
  job?: string;
  url: string;
}

export interface SeriesEpisode {
  media_id: string;
  title: string;
  id: number;
  media_type: string;
  name: string;
  overview: string;
  air_date: string;
  episode_number: number;
  episode_type: string;
  season_number: string;
}

export interface MultiplePlatformsRating {
  score_average?: number;
  score?: number;
  tmdb?: number;
  imdb?: number;
  tomatoes?: number;
  anilist?: number;
  mal?: number;
}
