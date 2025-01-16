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
} from "@/app/api/movie/actions";
import { MediaSliderProps } from "@/components/media/MediaSlider";
import { getTopAnime } from "@/app/api/anime/actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption";
import {
  checkRecommendServiceAvailability,
  getUserBaseRecommendations,
} from "@/app/api/recommend/actions";
import { shouldRenderUserbased } from "@/app/api/media/actions";
export const getInitialDataByMediaType = async (mediaType: string) => {
  const shouldRender = await shouldRenderUserbased();
  let initialData: MediaSliderProps[] = [];

  if (mediaType === "movie") {
    // Run all movie-related async calls in parallel
    const [recommendMovies, popularMovies, topRatedMovies, nowPlayingMovies] =
      await Promise.all([
        getUserBaseRecommendations("movie"),
        getPopularMovies(),
        getTopRatedMovies(),
        getNowPlayingMovies(),
      ]);

    initialData = [
      {
        href: "#",
        items: recommendMovies,
        name: "Recommend For You",
        type: "movie",
        shouldRender: shouldRender,
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
    // Run all series-related async calls in parallel
    const [
      recommendSeries,
      airingTodaySeries,
      onTheAirSeries,
      popularSeries,
      topRatedSeries,
      trendingSeries,
    ] = await Promise.all([
      getUserBaseRecommendations("serie"),
      getAiringTodaySeries({ page: 1 }),
      getOnTheAirSeries({ page: 1 }),
      getPopularSeries({ page: 1 }),
      getTopRatedSeries({ page: 1 }),
      getTrendingSeries({ page: 1 }),
    ]);

    initialData = [
      {
        href: "#",
        items: recommendSeries,
        name: "Recommend For You",
        type: "serie",
        shouldRender: shouldRender,
      },
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
    // Run all anime-related async calls in parallel
    const [recommendAnime, topAnime] = await Promise.all([
      getUserBaseRecommendations("anime"),
      getTopAnime({ page: 1 }),
    ]);

    initialData = [
      {
        href: "#",
        items: recommendAnime,
        name: "Recommend For You",
        type: "anime",
        shouldRender: shouldRender,
      },
      {
        href: "#",
        items: topAnime,
        name: "Top Anime",
        type: "anime",
        isLong: true,
      },
    ];
  }

  return initialData;
};
