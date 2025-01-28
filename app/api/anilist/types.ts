interface AnilistMedia {
  id: number;
  idMal: number;
  title: {
    english: string;
  };
  meanScore: number;
  averageScore: number;
}

interface AnilistResponse {
  data: {
    Page: {
      media: AnilistMedia[];
    };
  };
}
