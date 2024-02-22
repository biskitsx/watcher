// "use client";

import Image from "next/image";
import { Carousel, Card, Button } from "antd";
import { getTrendingMovies } from "@/action/movies";
import { Suspense } from "react";
// import { useEffect, useState } from "react";
// const { Meta } = Card;

export default async function Home() {
  // const [trendingMovies, setTrendingMovies] = useState([]);
  const trendingMovies = await getTrendingMovies(6);
  // useEffect(() => {
  //   const init = async () => {
  //     const res = await getTrendingMovies(6);
  //     setTrendingMovies(res);
  //   };

  //   init();
  // }, []);

  return (
    <div className="container flex flex-col gap-6">
      <Carousel autoplay className="rounded-md overflow-hidden max-h-96">
        {trendingMovies.map((movie, index) => (
          <div key={index}>
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={movie.title}
              width={1920}
              height={1080}
            />
          </div>
        ))}
      </Carousel>
      <div className="flex flex-col gap-4">
        <h1 className="font-semibold text-2xl">Trending</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus
          molestiae quod commodi fugit quisquam ad deserunt dolores odit
          voluptas dolor, excepturi ab corporis ex nam. Velit quaerat
          exercitationem eius amet?
        </p>
        <div className="flex gap-4">
          {trendingMovies.map((movie) => (
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                />
              }
            >
              {/* <Meta title={movie.title} /> */}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
