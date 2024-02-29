import { Carousel, Card, Button } from "antd";

interface MediaCarouselProps {
  items: any[];
}
export const MediaCarousel = ({ items }: MediaCarouselProps) => {
  return (
    <Carousel
      autoplay
      className="rounded-md overflow-hidden max-h-96 shadow-md"
    >
      {items.map((movie: any, index: number) => (
        <div key={index} className="relative">
          <div className="absolute bottom-8 left-8 ">
            <h1 className="text-xl text-base-100 font-bold">{movie.title}</h1>
            {/* <p>{movie.release_date}</p> */}
          </div>
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={movie.title}
            width={1920}
            height={1080}
          />
        </div>
      ))}
    </Carousel>
  );
};
