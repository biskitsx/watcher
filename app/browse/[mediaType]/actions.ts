import {
  getAiringTodaySeries,
  getOnTheAirSeries,
  getPopularSeries,
  getTopRatedSeries,
  getTrendingSeries,
} from "@/app/api/serie/actions";

import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/app/api/movie/actions";
import { MediaSliderProps } from "@/components/media/MediaSlider";
import { getTopAnime } from "@/app/api/anime/actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption";
import { getUserBaseRecommendations } from "@/app/api/recommend/actions";
export const getInitialDataByMediaType = async (mediaType: string) => {
  const session = await getServerSession(authOptions);
  const isLogin = session?.user ? true : false;
  let initialData: MediaSliderProps[] = [];
  if (mediaType === "movie") {
    const recommendMovies = await getUserBaseRecommendations("movie");
    const upcomingMovies = await getUpcomingMovies({ page: 1 });
    const popularMovies = await getPopularMovies();
    const topRatedMovies = await getTopRatedMovies();
    const nowPlayingMovies = await getNowPlayingMovies();

    initialData = [
      {
        href: "#",
        items: recommendMovies,
        name: "Recommend For You",
        type: "movie",
      },
      {
        href: "#",
        items: popularMovies,
        name: "Popular Movies",
        type: "movie",
        isLong: true,
      },
      {
        href: "#",
        items: topRatedMovies,
        name: "Top Rated Movies",
        type: "movie",
      },
      {
        href: "#",
        items: nowPlayingMovies,
        name: "Now Playing Movies",
        type: "movie",
      },
    ];
  } else if (mediaType === "serie") {
    const airingTodaySeries = await getAiringTodaySeries({ page: 1 });
    const onTheAirSeries = await getOnTheAirSeries({ page: 1 });
    const popularSeries = await getPopularSeries({ page: 1 });
    const topRatedSeries = await getTopRatedSeries({ page: 1 });
    const trendingSeries = await getTrendingSeries({ page: 1 });

    initialData = [
      {
        href: "#",
        items: airingTodaySeries.slice(0, 12),
        name: "Airing Today Series",
        type: "serie",
        isLong: true,
      },
      {
        href: "#",
        items: onTheAirSeries,
        name: "On The Air Series",
        type: "serie",
      },
      {
        href: "#",
        items: popularSeries,
        name: "Popular Series",
        type: "serie",
      },
      {
        href: "#",
        items: topRatedSeries,
        name: "Top Rated Series",
        type: "serie",
      },
      {
        href: "#",
        items: trendingSeries,
        name: "Trending Series",
        type: "serie",
      },
    ];
  } else if (mediaType === "anime") {
    const topAnime = await getTopAnime({ page: 1 });
    initialData = [
      {
        href: "#",
        items: topAnime,
        name: "Top Anime",
        type: "anime",
      },
    ];
  }
  return initialData;
};
