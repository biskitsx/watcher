export interface MDBListRatingResponse {
  rating: { [key: string]: number }; // A dictionary where keys are strings and values are numbers
  rating_type: string; // For "tmdb"
  mediatype: string; // For "movie"
  provider: string; // For "tmdb"
}
