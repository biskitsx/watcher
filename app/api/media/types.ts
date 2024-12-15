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
